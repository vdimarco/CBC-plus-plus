curl http://spotlight.dbpedia.org/rest/annotate \
  --data-urlencode "text=President Obama called Wednesday on Congress to extend a tax break for students included in last year's economic stimulus package, arguing that the policy provides more generous assistance." \
  --data "confidence=0.35" \
  --data "support=20" \
  -H "Accept:application/json"
  