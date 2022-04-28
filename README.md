# Inclusive Terminology Project

## Goal
As our language evolves so should our empathy, vocabulary, and word choice. The goal of this project is to assist in the change of deeply embedded habits. We all can begin to consider the implications of words and phrases that have long gone unchallenged and unchanged. By using this search we can start to replace non-inclusive terms with better alternatives. The list utilized by the app is by no means exhaustive but it gives a starting point.

## Architecture
![Architecture](/Architecture.png)

## Work
### API
Endpoint that scans given text input for any non inclusive terms. Returns the terms found, alternatives to be used, and reason why the term in non-inclusive. 

### Thesaurus App
Search bar style app that allows user to input term(s) and determine if the it is non-inclusive and receive alternatives to use. 

### OutLook Extension
Outlook extension add in that scans an email content for non inclusive terms and provides easy drop down of alternatives to swap in instead. 

### TODO
Expand Library of terms scanned for
Setup DNS for domains to AKS IP's
Record Demos and add as gifs to ReadMe