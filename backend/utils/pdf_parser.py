import io
import re
import pdfplumber

def extract_text(pdf_bytes: bytes) -> str:
    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        return "\n".join(page.extract_text() or "" for page in pdf.pages)

SECTION_HEADERS = {
    "experience": r"(work experience|experience|employment|work history)",
    "education":  r"(education|academic|qualification)",
    "skills":     r"(skills|technical skills|competencies|technologies)",
    "summary":    r"(summary|objective|profile|about)",
}

def detect_sections(text: str) -> dict:
    sections = {}
    current = "other"
    for line in text.split("\n"):
        for key, pattern in SECTION_HEADERS.items():
            if re.search(pattern, line.lower()):
                current = key
                break
        sections.setdefault(current, []).append(line)
    return {k: "\n".join(v) for k, v in sections.items()}