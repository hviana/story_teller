# story_teller

A storyteller that uses deep learning as pre and post processing and different
programming paradigms to think.

Reference code for work: "This paper describes an intelligent conversational
agent model that uses different programming paradigms combined for processing
over a semantic representation graph model of the natural language named
Abstract Meaning Representation (AMR) performing various Natural Language
Understanding (NLU) tasks. Knowledge graphs (KG) are also used to increase the
agent's knowledge of semantically related entities and allow for the expansion
of semantic relationships. An AMR graph manipulation layer was developed using
algorithms and methods in the imperative paradigm, in addition to several
predicates in the logical paradigm that serves to extract specific information
from such graphs. Several parameterizable AMR templates were also defined that
serve to assemble information and use it to provide feedback to the user. Both
this layer and the templates make use of the KG. Finally, above this AMR graph
manipulation layer and these templates, a conversational agent is built using an
agent model named Belief–Desire–Intention (BDI), structured in a programming
paradigm named Notification Oriented Paradigm (NOP), in a combination of both
named BDI-NOP. In the NOP paradigm, several collaborative entities interact with
each other through notifications. This paradigm with the BDI-NOP combination
proves to be interesting for the development of the model."

## How to run

Install the library for python called amrlib and its dependencies via pip.
Download the "graph to sentence" trained model and place it inside the "gtos"
folder; download the "sentence to graph" trained model and place it in the
"stog" folder. Run the python server `python3 server.py` and the application
`deno run --allow-all --unstable app.ts`.

## About

Author: Henrique Emanoel Viana, a Brazilian computer scientist, enthusiast of
web technologies, cel: +55 (41) 99999-4664. URL:
https://sites.google.com/view/henriqueviana

Improvements and suggestions are welcome!
