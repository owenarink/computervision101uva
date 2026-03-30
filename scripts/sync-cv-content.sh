#!/bin/zsh

set -euo pipefail

SCRIPT_DIR="${0:A:h}"
SITE_ROOT="${SCRIPT_DIR:h}"
VAULT_ROOT="${SITE_ROOT:h:h}"
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
  "CV101_LectureNotesRemarkableFiles.md"
  "CV101_LectureNotes1a.md"
  "CV101_Assignments.md"
  "CV101_F1.md"
  "CV101_Making_Groups_for_the_weekly_assignments.md"
  "CV101_preparation_for_assignments.md"
  "CV101_theory_questions_week1_interpolation_and_histograms.md"
  "CV101_python_assignment_1_equalization_and_Interpolation.md"
  "CV101_RvdBoomgaard_LectureNotes.md"
  "CV101_Lecture1a.pdf"
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

echo "Synced ${#files[@]} Computer Vision files to ${DEST_DIR}"
