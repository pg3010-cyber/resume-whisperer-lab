import spacy
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.util import ngrams
from nltk.stem import PorterStemmer
from collections import Counter

nlp = spacy.load("en_core_web_sm")
stemmer = PorterStemmer()

def tokenize_and_lemmatize(text: str) -> list:
    doc = nlp(text)
    return [token.lemma_.lower() for token in doc
            if not token.is_stop and not token.is_punct and token.text.strip()]

def tfidf_match_score(resume_text: str, jd_text: str) -> float:
    try:
        vec = TfidfVectorizer()
        matrix = vec.fit_transform([resume_text, jd_text])
        score = cosine_similarity(matrix[0], matrix[1])[0][0]
        return round(float(score), 4)
    except:
        return 0.0

def extract_ner(text: str) -> dict:
    doc = nlp(text)
    entities = {}
    for ent in doc.ents:
        entities.setdefault(ent.label_, []).append(ent.text)
    return entities

def extract_action_verbs(text: str) -> list:
    if not text:
        return []
    doc = nlp(text)
    verbs = [token.lemma_ for token in doc
             if token.pos_ == "VERB" and token.tag_ in ("VBD", "VBN", "VBG")]
    return list(set(verbs))

def ngram_keyword_gap(resume_text: str, jd_text: str, n=2) -> list:
    try:
        resume_tokens = tokenize_and_lemmatize(resume_text)
        jd_tokens = tokenize_and_lemmatize(jd_text)
        resume_ngrams = set(ngrams(resume_tokens, n))
        jd_ngrams = set(ngrams(jd_tokens, n))
        gaps = jd_ngrams - resume_ngrams
        jd_counts = Counter(ngrams(jd_tokens, n))
        return [" ".join(g) for g, _ in
                sorted(((g, jd_counts[g]) for g in gaps),
                       key=lambda x: -x[1])[:10]]
    except:
        return []

def extract_svo_triples(text: str) -> list:
    if not text:
        return []
    doc = nlp(text)
    triples = []
    for token in doc:
        if token.dep_ == "ROOT" and token.pos_ == "VERB":
            subj = [w.text for w in token.lefts  if w.dep_ in ("nsubj", "nsubjpass")]
            obj  = [w.text for w in token.rights if w.dep_ in ("dobj", "attr", "prep")]
            if subj or obj:
                triples.append({
                    "verb":    token.lemma_,
                    "subject": subj[0] if subj else None,
                    "object":  obj[0]  if obj  else None,
                })
    return triples[:10]

def discourse_coherence_score(text: str) -> float:
    try:
        sentences = [s.strip() for s in text.split(".") if len(s.strip()) > 10]
        if len(sentences) < 2:
            return 1.0
        vec = TfidfVectorizer()
        mat = vec.fit_transform(sentences)
        pairs = [cosine_similarity(mat[i], mat[i+1])[0][0]
                 for i in range(len(sentences) - 1)]
        return round(float(np.mean(pairs)), 4)
    except:
        return 0.0

def run_full_analysis(resume_text: str, jd_text: str, sections: dict) -> dict:
    return {
        "tfidf_score":     tfidf_match_score(resume_text, jd_text),
        "ner_entities":    extract_ner(resume_text),
        "action_verbs":    extract_action_verbs(sections.get("experience", "")),
        "keyword_gaps":    ngram_keyword_gap(resume_text, jd_text),
        "svo_triples":     extract_svo_triples(sections.get("experience", "")),
        "coherence_score": discourse_coherence_score(resume_text),
    }