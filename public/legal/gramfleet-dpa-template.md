# Data Processing Agreement (DPA)
## Article 28 GDPR — Processor Agreement Template

> **Instructions:** This template is for organizations using GramFleet within a team or business context. Fill in the bracketed fields before signing. Both parties must sign and date. Keep a copy with your GDPR records.
>
> **Note:** GramFleet is self-hosted software. The "Processor" in this agreement is the organization that operates GramFleet, not the GramFleet open-source project.

---

**DATA PROCESSING AGREEMENT**

Between:

**[CONTROLLER NAME]**, [registered address], [registration number] ("**Controller**")

and

**[PROCESSOR NAME]** (the organization operating GramFleet on the Controller's behalf), [registered address], [registration number] ("**Processor**")

(together, the "**Parties**")

---

## 1. Subject Matter and Duration

1.1 This Agreement governs the processing of personal data by the Processor on behalf of the Controller in connection with the use of the GramFleet bot platform ("**Service**").

1.2 This Agreement shall remain in force for the duration of the main services agreement between the Parties, and shall terminate automatically upon its expiry or earlier termination.

---

## 2. Nature, Purpose, and Subject Matter of Processing

2.1 **Nature of processing:** Collection, storage, retrieval, use, and erasure of personal data.

2.2 **Purpose:** Providing AI-assisted communication and task management functionality via Telegram forum topics.

2.3 **Subject matter:** Conversation messages sent to and from the GramFleet bot by authorized users of the Controller's Telegram group.

2.4 **Duration of processing:** As specified in Section 6 (Retention).

---

## 3. Types of Personal Data

The Processor may process the following categories of personal data on behalf of the Controller:

- **Conversation content:** Text messages sent to the bot by users.
- **User identifiers:** Telegram user IDs and usernames (as provided by Telegram's Bot API).
- **Metadata:** Message timestamps, topic/thread identifiers.
- **Any special categories of data** that users voluntarily include in their messages (the Controller is responsible for ensuring appropriate policies for such data).

---

## 4. Categories of Data Subjects

Users of the Controller's Telegram group who interact with the GramFleet bot.

---

## 5. Obligations of the Processor

5.1 The Processor shall:

(a) Process personal data only on documented instructions from the Controller, including with regard to transfers to third countries, unless required to do so by EU or Member State law;

(b) Ensure that persons authorised to process personal data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality;

(c) Implement appropriate technical and organisational measures under Article 32 GDPR (see Section 7);

(d) Respect the conditions referred to in Articles 28(2) and 28(4) GDPR for engaging another processor (sub-processor) (see Section 9);

(e) Assist the Controller in ensuring compliance with its obligations under Articles 32–36 GDPR, taking into account the nature of processing and the information available;

(f) Delete or return all personal data to the Controller after the end of the provision of services, and delete existing copies unless Union or Member State law requires storage;

(g) Make available to the Controller all information necessary to demonstrate compliance with the obligations laid down in Article 28 GDPR and allow for and contribute to audits, including inspections, conducted by the Controller or an auditor mandated by the Controller.

5.2 With regard to point (a), the Processor shall immediately inform the Controller if, in the Processor's opinion, an instruction infringes GDPR or other applicable data protection law.

---

## 6. Retention

6.1 Default retention is **90 days** from the date of each message. Messages older than 90 days are automatically purged by a daily cleanup job.

6.2 The Controller may configure retention on a per-topic basis using the `/retention` command. A value of `0` disables automatic purging for that topic.

6.3 The Processor shall ensure that purged data is permanently deleted from all storage locations (conversation history files and compacted summaries).

---

## 7. Technical and Organisational Measures (Article 32)

The Processor has implemented the following measures:

| Measure | Description |
|---------|-------------|
| **Confidentiality** | Conversation history stored in access-controlled server filesystem; no shared hosting |
| **Integrity** | Atomic file writes (tmp + rename) prevent partial writes or corruption |
| **Availability** | Configurable backup via operator's own backup infrastructure |
| **Pseudonymisation** | Telegram user IDs (numeric) are stored rather than names where possible |
| **Access control** | Bot responds only to messages from the registered Telegram group |
| **Transport encryption** | All external API calls use TLS 1.2+ (Telegram, Anthropic, ElevenLabs) |
| **Retention enforcement** | Automated daily sweep deletes data beyond the configured retention window |
| **Vulnerability management** | Open-source codebase subject to community review; security issues addressed per disclosure policy |

---

## 8. Assistance with Data Subject Rights

8.1 The Processor shall assist the Controller in fulfilling data subject requests under Chapter III GDPR. Available mechanisms:

- **Erasure (Article 17):** `/clear` command deletes all history for a topic; individual messages can be deleted by editing `topic-history.json` directly.
- **Access/portability (Articles 15, 20):** `topic-history.json` is plain JSON; export and provide to the data subject upon request.
- **Restriction (Article 18):** Set `/retention 0` to suspend automated deletion pending Controller review.

---

## 9. Sub-Processors

9.1 The Controller grants general authorisation for the Processor to engage the following sub-processors:

| Sub-Processor | Purpose | Location | DPA |
|---------------|---------|----------|-----|
| **Anthropic, PBC** | LLM inference (Claude API) | USA | [Anthropic DPA](https://www.anthropic.com/legal/dpa) |
| **Telegram Messenger Inc.** | Message routing (Bot API) | USA/EU | [Telegram Privacy Policy](https://telegram.org/privacy) |
| **ElevenLabs, Inc.** *(if voice enabled)* | Text-to-speech synthesis | USA | [ElevenLabs DPA](https://elevenlabs.io/dpa) |
| **Microsoft Corporation** *(if Edge TTS used)* | Text-to-speech synthesis | USA/EU | [Microsoft Privacy Statement](https://privacy.microsoft.com/privacystatement) |

9.2 The Processor shall inform the Controller of any intended changes concerning the addition or replacement of sub-processors, giving the Controller the opportunity to object to such changes.

---

## 10. Transfers to Third Countries

10.1 All sub-processors listed in Section 9 are based in the United States. Transfers are covered by:
- Standard Contractual Clauses (SCCs) where applicable, or
- The sub-processor's own adequacy or transfer mechanisms.

10.2 The Controller is responsible for ensuring that their use of these sub-processors is lawful under applicable data protection law.

---

## 11. Personal Data Breaches

11.1 The Processor shall notify the Controller without undue delay (and in any event within **72 hours** of becoming aware) of a personal data breach affecting data processed under this Agreement.

11.2 The notification shall include, at minimum: the nature of the breach, categories and approximate number of data subjects affected, likely consequences, and measures taken or proposed to address it.

11.3 For the incident response procedure, see [docs/INCIDENT_RESPONSE.md](./INCIDENT_RESPONSE.md).

---

## 12. Audit Rights

12.1 The Processor shall make available all information necessary to demonstrate compliance with this Agreement.

12.2 The Controller may conduct audits (including inspections) of the Processor's data processing activities, with reasonable notice (minimum 14 days except in cases of suspected breach).

---

## 13. Liability and Indemnification

Each Party shall be liable for, and shall indemnify the other Party against, any damage caused by a breach of this Agreement attributable to that Party, in accordance with the main services agreement.

---

## 14. Governing Law

This Agreement is governed by the law of [**GOVERNING LAW JURISDICTION**], consistent with Article 28(3) GDPR.

---

## Signatures

**Controller:**

Name: ______________________________

Title: ______________________________

Signature: _________________________

Date: ______________________________


**Processor:**

Name: ______________________________

Title: ______________________________

Signature: _________________________

Date: ______________________________

---

*This template is provided for informational purposes and does not constitute legal advice. Have a qualified lawyer review before execution.*
