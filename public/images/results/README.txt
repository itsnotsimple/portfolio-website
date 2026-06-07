Client results gallery images
==============================

Drop your client result screenshots here. The gallery reads entries from:

  src/data/content.ts  →  RESULTS array

Default paths expected:
  result-1.webp
  result-2.webp
  result-3.webp
  ... (add more entries in RESULTS to show more images)

Tips:
- webp, jpg, and png all work fine.
- Any aspect ratio is fine — images display at full width, natural height.
- To add a caption, set the `caption` field in the RESULTS array entry.
- To add more images: drop the file here, then add { src: '/images/results/result-N.webp' }
  to RESULTS in both content.ts AND contentBG.ts.
