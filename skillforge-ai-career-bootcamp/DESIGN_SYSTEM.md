# Design System — SkillForge AI Portfolio Edition

## Design Goal
Mobile-first premium learning app for a serious AI Engineering bootcamp. The UI should feel like a career command center, not a toy quiz app.

## Principles

1. **Beginner-friendly, not childish**
   - Large readable Vietnamese text
   - Clear cards and short sections
   - Mentor guidance through Nova
   - No overloaded dashboards

2. **Evidence-first UX**
   - Every major action should lead to proof: GitHub, README, screenshot, terminal output, CV bullet, interview answer.
   - Avoid “Mark Complete” mindset. Use “Prove Skill”.

3. **Career command center**
   - Today = mission control
   - Learn = curriculum
   - Code = practical starter kits
   - Build = project proof
   - Vault = evidence system
   - Career = application prep
   - Profile = readiness score

4. **Taste Skill mobile premium**
   - Calm dark green base
   - Soft off-white background
   - Emerald as progress/success
   - Warm yellow for challenge/highlight
   - Large rounded cards
   - Generous spacing
   - No fake complex charts

## Color System

```text
Ink:        #07140f
Emerald:    #9ff2c8
Soft Green: #dfe8df
Cream:      #f8f6ef
Gold:       #ffd36e
Muted Text: #607069
```

## Components

- `taste-hero`: hero / command center block
- `surface-card`: light glass card
- `ink-card`: dark premium card
- `Badge`: compact state indicator
- `Progress`: simple progress bar
- `Scroller`: horizontal mobile card rail

## Navigation

Seven bottom tabs:

```text
Today · Learn · Code · Build · Vault · Career · Profile
```

Vault is included because the app is now evidence-first.
