# Security note

Limbert Lyons. One page for a COLP, a DPO, or the person who runs the firm's IT. Hand this across before the second meeting.

## Where the machine sits

The model runs on a computer the client firm controls, inside their network. If they do not have a suitable machine, it runs on one physical computer in the UK that is dedicated to that firm and not shared with anyone else. There is no multi-tenant platform and no shared model that other clients use.

Prompts, documents, and answers are not sent to OpenAI, Microsoft, Google, Anthropic, or any other model provider.

## Who can log in

Named people only. James Limbert and Joseph Lyons, plus any engineer named in the statement of work. Each person has their own account. Shared passwords are not used. Access requires multi-factor authentication. Access is removed the day an engagement ends, or the day a person leaves.

The client firm's own users are accounts the firm creates and can disable. Limbert Lyons does not keep a back door.

## What is logged

For each request the system records:

- the user
- the time
- the question
- the identifiers of the documents retrieved
- the draft that was shown

The log stays on the same machine as the model. It is there so the COLP can see what was retrieved. It is not a second copy of the firm's archive stored somewhere else.

## Retention

During a pilot, the corpus and the log stay on the client's machine. Limbert Lyons does not take a copy away.

At handover, or when a care retainer ends, Limbert Lyons deletes working copies from any machine it controls and confirms that in writing. The firm keeps the corpus, the evaluation set, and the log. They were always the firm's.

Demo meetings use synthetic files. A prospect's real documents are not copied onto a laptop that leaves the building.

## Subprocessors in the model path

None. The model path is the route a prompt and a document take to produce an answer. That route does not include a subprocessor.

A subprocessor would be named in the Article 28 agreement before any were added. Email and calendar used to arrange the work are separate from the model path and are listed in the agreement if they touch personal data.

## Training

Client records are not used to train a shared model. They are not used to improve a model that any other client can use.

## What this note does not say

It does not say the firm is GDPR compliant, ISO 27001 certified, or Cyber Essentials certified. Certification is stated only when the certificate exists. The client's lawful basis, their own access controls, and their own retention rules remain theirs.
