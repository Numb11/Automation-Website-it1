# Limbert Lyons — the offer

Private AI for firms that cannot send client data out.

James Limbert and Joseph Lyons. One buyer, one workflow, one way of judging whether it worked.

This is the document a proposal is copied from. It is not a contract. The statement of work for a named firm adopts these numbers unless that firm agrees something tighter in writing.

## Who it is for

UK law firms of about 20 to 200 people.

They have privilege, a COLP, and fee-earners who are already trying public tools. Accountancy practices can hear the same offer in the same month. Private clinics and smaller FCA firms wait until two firms will put their name to the work, professional indemnity is in place, and Cyber Essentials is certified. The public sector waits until a buyer asks.

Limbert Lyons does not give legal advice. A solicitor at the client firm signs anything that is used.

## The workflow

Search and first draft from the firm's own precedents and know-how.

The model runs on a machine the firm controls, or on one UK machine dedicated to that firm. It retrieves passages from a corpus the firm owns. It drafts only from those passages. A person approves every output. The system keeps a log of who asked, what was retrieved, and what was shown.

Out of scope for the first pilot:

- Autonomous legal advice
- Anything filed at court
- A general chatbot over the whole of SharePoint
- Fine-tuning a model
- Sending matter text to a public model provider

Fine-tuning waits until retrieval on a clean corpus has failed the test below. It costs more, and it is harder to explain to a regulator.

## How the work is judged

Before week one, the firm and Limbert Lyons freeze a set of **30 questions** drawn from the firm's real work. Each question must be answerable from documents that will be in the corpus. The set is not changed after scoring starts.

Two scores, marked by a solicitor at the firm, not by Limbert Lyons:

1. **Source in the file.** The passage cited in the draft is actually in a document the system retrieved. An invented case, an invented clause, or a document that is not in the corpus is a failure of this score.
2. **A solicitor will sign it.** The draft is a usable starting point for a solicitor, who remains the author of anything that leaves the firm.

Default bar, written into the statement of work:

- At least **85 percent** of the 30 answers cite a passage that is really in the retrieved file.
- A solicitor marks at least **70 percent** as a usable first draft.
- **One invented citation fails the pilot**, whatever the other scores are.

If that bar is missed, the final milestone is not billed.

## The ladder

### 1. Data boundary review — £3,000 to £5,000

About two weeks.

Map what would leave the building if the firm used Copilot or a public chatbot on the work this pilot is about. Deliver a data map and the inputs a DPO needs for a DPIA. The firm can stop here. The review is useful even if they never buy a model.

### 2 and 3. Corpus and eight-week pilot — £18,000 to £35,000, fixed

The price sits inside that band according to how scattered the documents are and whether the machine already exists. It is fixed before work starts. It is not a day rate.

The corpus work, included in the pilot:

- Deduplicate
- Strip what must not be retrieved
- Tag by matter sensitivity
- Freeze the 30-question evaluation set

The dataset stays the firm's. Limbert Lyons does not keep a copy after handover unless the care retainer says so, and then only on the firm's machine.

The pilot:

- One open-weight model, served inside the firm's network
- Retrieval only
- Human approval on every output
- A written handover: how to start it, how to stop it, how to export the log, how to rerun the 30 questions

Weeks 1 and 2 agree the questions, the data map, and the machine. Weeks 3 to 6 clean the corpus and stand up retrieval on their network. Weeks 7 and 8 run the scored test and hand over. If the bar is missed, the final milestone is not billed.

### 4. Care — £2,000 to £5,000 a month

Patch the model, rerun the 30 questions when the corpus changes, and export the audit log. Cancel on one month's notice after the first three months.

## Language that is allowed

- Data stays on infrastructure the client controls.
- Their records are not used to train a shared model.
- Outputs cite the source.
- A person at the firm approves them.
- Limbert Lyons will sign as processor under UK GDPR Article 28.
- The pilot has a written pass bar. If it is missed, the final milestone is not billed.

## Language that is not allowed

Do not say, on the site, in a proposal, or in a meeting:

- GDPR compliant, AI Act compliant, FCA compliant, or SRA compliant
- Certified, unless the named certificate is already held
- ISO 27001, unless the firm is certified. "Aligned" is not a certificate. Do not say aligned either, until there is a control list a buyer can read.
- Cyber Essentials, until the certificate exists. Until then say the application is in progress.
- Guaranteed privilege
- The model will not be wrong
- We replace the solicitor

Self-hosting removes a foreign processor and a training clause from the flow. The firm still needs a lawful basis, security, and records. EU high-risk duties for Annex III systems apply from 2 December 2027. Sell the evidence a DPO can file. Do not sell a certificate this firm cannot hold.

## What a demo is allowed to contain

Synthetic matter files only. Never a prospect's real documents on a laptop that leaves their office.
