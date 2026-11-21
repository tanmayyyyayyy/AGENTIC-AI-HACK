# Product Space AI Hackathon — Problem 5

## Project

**PivotCraft AI — Career Pivot Coach**

## One-line pitch

Turn a career change into a role-specific learning plan, portfolio proof, interview practice, and a feedback loop from application outcomes.

## Solution

PivotCraft AI helps a learner move from their current experience toward a target role. They can add their profile or resume, choose a role, and paste a real job description. Opportunity Match compares the role requirements with the learner's recorded skills and evidence, then surfaces the most relevant gaps. The Weekly Planner turns those priorities into a week-by-week plan, while Project Forge suggests portfolio work connected to the gaps. Interview Arena gives mock interview practice and evaluates answers against a rubric. Progress pages track completed learning and evidence.

The Application Tracker closes the loop after the learner starts applying. Users record company, role, role type, date, and outcome. PivotCraft summarizes interview and offer outcomes by role type so the learner can compare their own application history and adjust which roles they prioritize. The summaries are based only on entries the user records; they are not predictions about the broader job market.

## Problem 5 checklist

- **Resume and target-role intake:** Profile and resume tools plus Career Selection.
- **Skill-gap map from real job descriptions:** Opportunity Match and Job Description Analyzer analyze pasted postings; role matching also uses curated job-description benchmarks.
- **Week-by-week learning plan:** Weekly Planner and Learning Roadmap.
- **Portfolio project suggestions:** Project Forge and Role-Tailored Project Portfolio.
- **Rubric-scored mock interviews:** Interview Arena.
- **Progress tracking that adjusts the plan:** Progress Analytics, roadmap progress, and Career Autopilot can replan from current skill gaps and recorded evidence.
- **Application tracker that learns response patterns:** Application Tracker groups recorded outcomes by role type and computes the interview/offer share for each type.

## Demo path

1. Open the landing page and select **Explore Demo**.
2. Review the learner profile and target role.
3. Open **Opportunity Match** and analyze the sample or a pasted job description.
4. Follow the top gap to the weekly plan and a matching portfolio project.
5. Open **Interview Arena** to demonstrate rubric feedback.
6. Open **Application Tracker**, add a few applications, change their outcomes, and show role-type response patterns updating immediately.

## Data and limitations

Application records are stored in browser local storage on the current device. They are not synced across devices or sent to the application server. Role-type statistics are descriptive and become more useful as the learner adds outcomes. They do not establish that a role type caused an interview or offer. Job-description analysis is based on the text supplied by the user and the application's curated benchmark set; this is not a live job-board feed.
