#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
SITE_ROOT="$(cd -- "${SCRIPT_DIR}/.." && pwd)"
VAULT_ROOT="$(cd -- "${SITE_ROOT}/../.." && pwd)"
DEST_DIR="${SITE_ROOT}/content/computer-vision"

mkdir -p "${DEST_DIR}"

# Keep the Quartz content folder limited to the Computer Vision subset.
find "${DEST_DIR}" -mindepth 1 -maxdepth 1 -exec rm -f {} +

files=(
  "Computer Vision Index.md"
  "ComputerVision101_Theory.md"
  "ComputerVision101_Theory_Week1.md"
  "ComputerVision101_Week1_WhatIsAnImage.md"
  "ComputerVision101_Week1_ImageDefinition_DomainAndRange.md"
  "ComputerVision101_Week1_Discretization.md"
  "ComputerVision101_Week1_Sampling.md"
  "ComputerVision101_Week1_Quantization.md"
  "ComputerVision101_Week1_Interpolation.md"
  "ComputerVision101_Week1_NearestNeighborInterpolation.md"
  "ComputerVision101_Week1_LinearInterpolation.md"
  "ComputerVision101_Week1_BilinearInterpolation.md"
  "ComputerVision101_Week1_Histograms.md"
  "ComputerVision101_Week1_NyquistShannonSamplingTheorem.md"
  "ComputerVision101_Week1_LocalOperators.md"
  "ComputerVision101_Theory.md"
  "CV101_Lectures.md"
  "CV101_LectureNotes.md"
  "CV101_Assignments.md"
  "CV101_F1.md"
  "CV101_RvdBoomgaard_LectureNotes.md"
  "ICV_2026_HC0a_kickoff.pdf"
  "ICV_2026_HC1a_Images_Interpol.pdf"
  "ICV_2026_HC1a_Images_Interpol 1.pdf"
  "ComputerVision101_Week1_WhatIsAnImage_Slide-12.png"
  "ComputerVision101_Week1_Definition_Slide-13.png"
  "ComputerVision101_Week1_Sampling_Slide-22.png"
  "ComputerVision101_Week1_Quantization_Slide-19.png"
  "ComputerVision101_Week1_NearestNeighbor_Slide-27.png"
  "ComputerVision101_Week1_LinearInterpolation_Slide-29.png"
  "ComputerVision101_Week1_BilinearInterpolation_Slide-38.png"
)

for file in "${files[@]}"; do
  cp "${VAULT_ROOT}/${file}" "${DEST_DIR}/${file}"
done

python3 - <<'PY'
from pathlib import Path

dest = Path(r"/Users/owenarink/Documents/Obsidian Vault/06. Coding Projects/cv-quartz/content/computer-vision")

index_path = dest / "Computer Vision Index.md"
index_path.write_text(
    """#university #math #computervision #programming
# Theory
[[ComputerVision101_Theory]]

# Lecture notes
https://rvdboomgaard.github.io/ComputerVision_LectureNotes/LectureNotes/IP/index.html

# Lectures
[[CV101_Lectures]]
[[CV101_LectureNotes]]

# Assignments
[[CV101_Assignments]]
""",
    encoding="utf-8",
)

lecture_notes_path = dest / "CV101_LectureNotes.md"
lecture_notes_path.write_text(
    """#university #computervision #lectures

The handwritten lecture-note files are kept in the private Obsidian vault.

Use these public notes instead:

- [[ComputerVision101_Theory_Week1]]
- [[CV101_Lectures]]
""",
    encoding="utf-8",
)

week1_path = dest / "ComputerVision101_Theory_Week1.md"
text = week1_path.read_text(encoding="utf-8")
text = text.replace(
    """Digitized lecture notes:
[[CV101_LectureNotes1a]]

""",
    "",
)
week1_path.write_text(text, encoding="utf-8")
PY

echo "Synced ${#files[@]} Computer Vision files to ${DEST_DIR}"
