#!/usr/bin/awk -f

BEGIN {
    FS=":"
    print "Parsing HTML file for recipe data..."
}

# Example: extract title and ingredients from simple HTML-like text
/<title>/ {
    gsub(/<\/?title>/, "", $0)
    print "TITLE=" $0
}

/<ingredients>/ {
    gsub(/<\/?ingredients>/, "", $0)
    print "INGREDIENTS=" $0
}