---
title: "Data note: Peru's ESCALE school registry"
lang: en
slug_es: "padron-escale"
slug_en: "escale-registry"
order: 6
status: cerrado
summary: "How to use the Ministry of Education's school registry properly, with a reproducible script."
problema: "The education services registry is the obligatory source for any analysis of schools in Peru, and it is almost always used incorrectly: counting rows overstates the number of schools, inactive services remain in the dataset, and the original file encoding breaks accented characters."
para_quien: "Anyone working with Peruvian education data. An open technical note."
datos: "The ESCALE–MINEDU education services registry, March 2026 cut: original DBF file, reproducible UTF-8 derivatives, and a report on its characteristics and limitations."
open_data: true
repo: ""
site: ""
report: ""
---

The note documents three things that prevent errors: what the unit of record actually is (not the school), how to distinguish active from inactive services, and how to convert the original file without losing characters. The conversion script is part of the note.
