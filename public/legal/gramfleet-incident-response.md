# Incident Response Playbook
## GramFleet — Data Breach & Security Incident Procedures

> **Scope:** This playbook covers personal data breaches and security incidents affecting GramFleet deployments. It is designed for the operator (the organization running GramFleet) and fulfills the procedural requirements of GDPR Article 33–34 and ISO 27001 A.16.

---

## Incident Severity Levels

| Level | Description | Examples | Response Time |
|-------|-------------|---------|--------------|
| **P1 — Critical** | Active breach, data actively exfiltrated or exposed | Server compromise, bot token leaked, conversation data publicly exposed | **Immediate (< 1 hour)** |
| **P2 — High** | Potential breach, unauthorized access suspected | Anomalous API usage, unknown login to server, bot responding strangely | **< 4 hours** |
| **P3 — Medium** | Security misconfiguration, no confirmed data exposure | Exposed admin port, weak permissions, dependency vulnerability | **< 24 hours** |
| **P4 — Low** | Security improvement needed, no active risk | Outdated dependency, missing security header | **< 7 days** |

---

## Phase 1: Detection & Initial Assessment (0–30 min)

### 1.1 Indicators of Compromise

Watch for:
- Unexpected API usage spikes in Anthropic/ElevenLabs dashboards
- Bot responding to messages from unknown chats
- `~/.claude/PAI/PULSE/logs/` containing errors about unexpected auth or access
- Unauthorized access to the server hosting GramFleet
- Bot token appearing in unexpected places (GitHub, Slack, etc.)
- `topic-history.json` last-modified timestamp is unexpectedly recent

### 1.2 Immediate Containment Actions

**If the bot token is compromised:**
```bash
# Revoke immediately via BotFather
# Open Telegram → @BotFather → /mybots → [your bot] → API Token → Revoke

# Stop the bot
systemctl stop gramfleet  # or: kill $(cat ~/.claude/PAI/PULSE/state/pulse.pid)

# Rotate the token in your environment
nano ~/.claude/.env  # update TELEGRAM_BOT_TOKEN
```

**If the server is compromised:**
```bash
# Immediately stop the bot and rotate ALL secrets
systemctl stop gramfleet

# Rotate:
# 1. Telegram bot token (via BotFather)
# 2. Anthropic API key (via console.anthropic.com)
# 3. ElevenLabs API key (if used)
# 4. Any other secrets in ~/.claude/.env
```

**If conversation data was exposed:**
```bash
# Identify affected topics
ls ~/.claude/PAI/PULSE/data/topic-history.json
ls ~/.claude/PAI/PULSE/data/topic-memory/

# Preserve evidence (do NOT delete yet — needed for assessment)
cp -r ~/.claude/PAI/PULSE/data/ /tmp/incident-evidence-$(date +%Y%m%d)/
```

---

## Phase 2: Assessment (30 min – 4 hours)

### 2.1 Determine Scope

Answer these questions:

1. **What data was potentially exposed?**
   - Conversation content: which topics, what date range?
   - User identifiers (Telegram IDs)?
   - Bot configuration / API keys?

2. **How many data subjects are affected?**
   - Count unique Telegram user IDs in affected `topic-history.json` entries.

3. **What was the attack vector?**
   - Server access? Network sniffing? Token leak? Supply chain?

4. **Is the breach contained?**
   - Is the attacker still active?
   - Has the root cause been remediated?

### 2.2 Evidence Preservation

```bash
# Capture logs
cp ~/.claude/PAI/PULSE/logs/* /tmp/incident-evidence-$(date +%Y%m%d)/logs/

# Capture server access logs
cp /var/log/auth.log /tmp/incident-evidence-$(date +%Y%m%d)/
cp /var/log/nginx/access.log /tmp/incident-evidence-$(date +%Y%m%d)/ 2>/dev/null || true

# Record timestamps
date -u > /tmp/incident-evidence-$(date +%Y%m%d)/timeline.txt
```

---

## Phase 3: Notification (GDPR Article 33–34)

### 3.1 Supervisory Authority Notification (Article 33)

**Deadline: 72 hours from becoming aware of the breach.**

If you determine the breach is likely to result in a risk to individuals' rights and freedoms, notify your supervisory authority (e.g., your national DPA).

**Required information:**
- Nature of the breach (confidentiality / integrity / availability)
- Categories and approximate number of data subjects affected
- Categories and approximate number of personal data records affected
- Name and contact details of the Data Protection Officer (if applicable)
- Likely consequences of the breach
- Measures taken or proposed to address the breach

**Template notification text:**

```
Subject: Personal Data Breach Notification — [YOUR ORGANIZATION]
Date: [DATE]
Reference: Incident [INCIDENT-ID]

We are writing to notify you of a personal data breach affecting our
GramFleet deployment as required by Article 33 GDPR.

Nature of breach: [unauthorized access / accidental disclosure / other]
Date/time of breach: [DATETIME UTC] (discovered: [DATETIME UTC])
Data subjects affected: approximately [N] users
Personal data involved: [conversation messages / user IDs / other]
Likely consequences: [describe]
Measures taken: [describe containment and remediation]

We are continuing our investigation and will provide further updates
as information becomes available.

Contact: [DPO NAME, EMAIL]
```

### 3.2 Data Subject Notification (Article 34)

**Required when:** The breach is likely to result in **high risk** to individuals.

High risk indicators:
- Sensitive personal data exposed (health, financial, political opinions in messages)
- Data that could be used for identity theft
- Large number of individuals affected

**Notification to data subjects must include:**
- Clear description of the breach
- Name and contact details of the DPO (if applicable)
- Likely consequences
- Measures taken to address the breach

**Template:**

```
Subject: Important Security Notice — [YOUR SERVICE NAME]

We are writing to inform you of a security incident that may have
affected your personal data.

What happened: [Brief description]
What data was involved: [Message content / identifiers]
What we are doing: [Containment and remediation steps]
What you can do: [Any user actions recommended]

If you have questions, contact: [EMAIL]
```

---

## Phase 4: Remediation

### 4.1 Immediate Fixes

| Root cause | Remediation |
|-----------|-------------|
| Leaked bot token | Revoke via BotFather, rotate in `.env`, restart bot |
| Leaked API key | Rotate in provider dashboard, update `.env` |
| Server compromise | Rebuild server, rotate all secrets, review access logs |
| Exposed port | Close port, update firewall rules |
| Dependency vulnerability | `bun update`, test, redeploy |

### 4.2 Data Cleanup (if data was exposed externally)

```bash
# If conversation data needs to be deleted as part of breach response:
# Use /clear inside affected Telegram topics, OR manually:

# Backup first (for legal/audit purposes)
cp ~/.claude/PAI/PULSE/data/topic-history.json \
   /secure-backup/topic-history-pre-breach-$(date +%Y%m%d).json

# Then clear the affected topic programmatically (example)
# (bun run a small script, or use TopicStore.clearHistory(topicName))
```

### 4.3 Post-Incident Hardening Checklist

- [ ] Rotate all secrets (bot token, API keys)
- [ ] Review and tighten server firewall rules
- [ ] Enable disk encryption on server
- [ ] Set `chmod 600 ~/.claude/.env`
- [ ] Review `topic-history.json` permissions (`chmod 600`)
- [ ] Consider reducing `retentionDays` to minimize future exposure window
- [ ] Review sub-processor breach notifications (Anthropic, Telegram, ElevenLabs)
- [ ] Update incident log with root cause and lessons learned

---

## Phase 5: Documentation & Review

### 5.1 Incident Record (required by Article 33(5))

Every breach — even those not notified to the authority — must be documented:

| Field | Value |
|-------|-------|
| Incident ID | INC-[YYYYMMDD]-[SEQ] |
| Detected at | |
| Reported by | |
| Severity | P1 / P2 / P3 / P4 |
| Nature | Confidentiality / Integrity / Availability |
| Root cause | |
| Data affected | |
| Subjects affected | |
| Notified authority | Yes / No / Not required |
| Authority notified at | |
| Subjects notified | Yes / No / Not required |
| Remediation | |
| Lessons learned | |
| Closed at | |

Store incident records for **minimum 3 years** from the date of the breach.

### 5.2 Post-Mortem

Within 7 days of containment, conduct a post-mortem:
1. Timeline of events
2. Root cause analysis
3. What worked / what didn't
4. Process improvements
5. Update this playbook if needed

---

## Quick Reference

### Key Contacts

| Role | Name | Contact |
|------|------|---------|
| Incident lead | [NAME] | [EMAIL/PHONE] |
| DPO (if applicable) | [NAME] | [EMAIL] |
| Legal counsel | [NAME] | [EMAIL/PHONE] |
| Anthropic support | — | [console.anthropic.com/support](https://console.anthropic.com/support) |
| Telegram security | — | security@telegram.org |

### Supervisory Authorities (EU)

Report to the authority of your EU establishment. Common ones:

| Country | Authority | Website |
|---------|----------|---------|
| Germany | BfDI | bfdi.bund.de |
| France | CNIL | cnil.fr |
| Netherlands | AP | autoriteitpersoonsgegevens.nl |
| Ireland | DPC | dataprotection.ie |
| Full list | EDPB | edpb.europa.eu/about-edpb/about-edpb/members_en |

---

*Review this playbook quarterly or after each incident.*
