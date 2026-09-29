# Career Compass

Competitive Exam Awareness Portal into a comprehensive, professional Government Jobs & Competitive Exams platform.

IMPORTANT:

 application with a proper jobs/exams database, eligibility engine, search, filtering, notifications and admin management.

The portal must be useful for students who have completed 10th, 12th, Diploma, Graduation, B.Tech/BE, Post Graduation and other qualifications.

The application must be responsive on desktop, tablet and mobile.

Do not use fake current deadlines, fake vacancies or fake "LIVE" statuses.

Separate evergreen exam/job information from time-sensitive recruitment notifications.

For current recruitment information, only show information that can be verified from official recruiting-authority sources.

Every time-sensitive record must contain a lastVerified date and official source URL.

==================================================

MAIN NAVIGATION
==================================================

Update the navigation to:

Home
Find Jobs
Competitive Exams
Live Notifications
Eligibility Finder
Jobs by Qualification
Jobs by Category
Jobs by State
CSE & Engineering Jobs
Preparation
About

If an Admin login already exists, add:

Admin Dashboard

==================================================
2. DATABASE / DATA MODEL

Create a structured job/exam data model.

Each record should contain:

id
title
shortTitle
organization
department
category
subCategory
jobType
description
responsibilities
qualification
eligibleStreams
minimumQualification
experienceRequired
ageMin
ageMax
ageRelaxation
nationality
vacancies
salary
payLevel
jobLocation
selectionProcess
examPattern
syllabus
applicationFee
applicationStart
applicationEnd
examDate
admitCardDate
resultDate
status
officialWebsite
officialNotificationUrl
officialApplyUrl
lastVerified
isEvergreen
tags

Use proper types and validation.

==================================================
3. ADD 100+ JOB / EXAM RECORDS

Populate the database with AT LEAST 100 distinct opportunities.

Do not create meaningless duplicates.

Use the following categories.

A. UPSC

UPSC Civil Services Examination

Indian Administrative Service (IAS)

Indian Police Service (IPS)

Indian Foreign Service (IFS)

Indian Revenue Service (IRS)

Indian Forest Service

Engineering Services Examination

Combined Defence Services

National Defence Academy

CAPF Assistant Commandant

Combined Medical Services

Indian Economic Service

Indian Statistical Service

Combined Geo-Scientist Examination

UPSC EPFO

UPSC Assistant Section Officer

UPSC Enforcement Officer

UPSC Assistant Provident Fund Commissioner

UPSC Scientific Officer

UPSC Senior Scientific Assistant

B. SSC

SSC Combined Graduate Level (CGL)

SSC CHSL

SSC Multi Tasking Staff (MTS)

SSC Havaldar

SSC Junior Engineer

SSC General Duty Constable

SSC Central Police Organization / CPO

SSC Stenographer Grade C

SSC Stenographer Grade D

SSC Selection Post

SSC Junior Hindi Translator

SSC Sub-Inspector

SSC Statistical Investigator

SSC Tax Assistant

SSC Assistant Section Officer

SSC Auditor

SSC Accountant

SSC Inspector

SSC Upper Division Clerk

SSC Lower Division Clerk

C. BANKING

IBPS PO / Management Trainee

IBPS Customer Service Associate / Clerk

IBPS Specialist Officer - IT Officer

IBPS Specialist Officer - Agriculture Field Officer

IBPS Specialist Officer - HR/Personnel

IBPS Specialist Officer - Law Officer

IBPS Specialist Officer - Marketing Officer

IBPS RRB Office Assistant

IBPS RRB Officer Scale I

IBPS RRB Officer Scale II

IBPS RRB Officer Scale III

SBI Probationary Officer

SBI Junior Associate

SBI Specialist Cadre Officer

RBI Grade B

RBI Assistant

NABARD Grade A

NABARD Grade B

SEBI Grade A

SIDBI Grade A

D. RAILWAYS

RRB NTPC Graduate

RRB NTPC Undergraduate

RRB Group D

RRB Junior Engineer

RRB Assistant Loco Pilot

RRB Technician

RPF Constable

RPF Sub-Inspector

RRB Paramedical Staff

RRB Ministerial and Isolated Categories

Railway Clerk

Railway Station Master

Railway Goods Train Manager

Railway Commercial Apprentice

Railway Traffic Assistant

E. DEFENCE

NDA

CDS

AFCAT

Indian Army Agniveer

Indian Navy Agniveer

Indian Air Force Agniveervayu

Indian Coast Guard Navik

Indian Coast Guard Yantrik

CAPF Assistant Commandant

Territorial Army Officer

Indian Army Technical Graduate Entry

Indian Navy SSC Officer

Indian Air Force AFCAT Technical Branch

F. TEACHING & ACADEMICS

CTET

UGC NET

CSIR NET

KVS Teaching Recruitment

KVS Non-Teaching Recruitment

NVS Teaching Recruitment

NVS Non-Teaching Recruitment

State TET

Assistant Professor

Government School Teacher

Polytechnic Lecturer

Government College Lecturer

G. SCIENCE / TECHNOLOGY / ENGINEERING

ISRO Scientist/Engineer

ISRO Technical Assistant

DRDO Scientist

DRDO Technical Assistant

DRDO Technician

NIC Scientist

NIC Scientific/Technical Assistant

BARC Scientific Officer

CSIR Scientist

CSIR Technical Assistant

Scientific Assistant

Scientific Officer

Technical Officer

Programmer

Software Engineer - Government Organizations

System Administrator

Network Engineer

Cyber Security Analyst

Data Analyst

Database Administrator

This gives the portal 120+ entries.

==================================================
4. JOB DESCRIPTIONS

Every entry must have a meaningful description.

Example:

Title:
IBPS Specialist Officer - IT Officer

Description:
A specialist banking recruitment opportunity for candidates with relevant qualifications in Computer Science, Information Technology, Computer Engineering or related disciplines. The selected candidate works on banking technology, information systems, software applications, databases, cybersecurity and IT infrastructure according to the notified role.

Responsibilities:

Maintain and support IT systems

Assist with banking applications

Database and network operations

Information security

Technology implementation

Troubleshooting

Do the same for EVERY job.

Do not copy the exact same description for multiple jobs.

Descriptions should explain:

What the job is

What the employee does

Who usually applies

Career relevance

Selection method

==================================================
5. ELIGIBILITY INFORMATION

For every record provide:

Educational Qualification
Eligible Degree
Eligible Branch/Stream
Age Limit
Experience
Nationality
Other Requirements

Use clear language.

Examples:

10th:
"Candidates who have passed Class 10 from a recognized board."

12th:
"Candidates who have passed Class 12 or equivalent from a recognized board."

Graduate:
"Candidates holding a bachelor's degree from a recognized university."

B.Tech CSE:
"Candidates with B.E./B.Tech in Computer Science, Information Technology or the branches specifically permitted by the official notification."

IMPORTANT:
Do not assume that every job accepts every engineering branch.

Use:

"Check official notification for discipline-specific eligibility."

where appropriate.

==================================================
6. CSE / ENGINEERING ELIGIBILITY

Create detailed stream tags:

CSE
IT
ECE
EEE
Mechanical
Civil
Chemical
Biotechnology
Agriculture
Any Engineering
Any Degree
Science
Commerce
Arts
Medical
Law
Pharmacy
Diploma
10th
12th

Allow multiple streams per job.

Create a special:

"💻 CSE & Engineering Opportunities"

page.

Include:

IT Officer

Software/Technical roles

ISRO

DRDO

NIC

BARC

CSIR

Railway technical jobs

SSC technical jobs

Banking IT Officer

Engineering Services

PSU/technical opportunities

State technical recruitment

Only display a job as eligible for CSE if its qualification actually permits CSE/IT or the official notification permits that branch.

==================================================
7. ELIGIBILITY FINDER

Create a powerful page:

"🎯 Find Jobs You're Eligible For"

Form fields:

Age

Gender (only if officially relevant)

Qualification

10th

12th

Diploma

Graduation

B.E./B.Tech

Post Graduation

Other

Degree

B.Tech

B.E.

B.Sc

B.Com

B.A.

BCA

MCA

M.Tech

MBA

LLB

MBBS

Other

Engineering Branch

CSE

IT

ECE

EEE

Mechanical

Civil

Chemical

Other

State

Category

Experience

Fresher

Experienced

Preferred Sector

Banking

Railway

Defence

IT

Teaching

Administration

Science & Technology

Police

State Government

Central Government

After submission, calculate matching jobs.

Display:

"🎉 You may be eligible for 38 opportunities"

For every result show:

Job Name
Organization
Why you match
Qualification match
Age match
Stream match
Current application status
Deadline
Official notification
Apply button

==================================================
8. ELIGIBILITY MATCHING ENGINE

Do NOT simply filter by qualification.

Create a scoring/matching system.

Example:

Qualification match = 40%
Age match = 20%
Stream match = 20%
Experience match = 10%
Other criteria = 10%

Display:

Excellent Match
Good Match
Possible Match
Check Notification

Example:

"Why this matches you"

✓ Your qualification matches
✓ Your age is within the listed range
✓ CSE is an accepted discipline

OR:

"⚠️ Your degree matches, but the official notification requires specific experience."

Never guarantee eligibility.

Always display:

"Eligibility shown is an initial match. Candidates must verify the official notification before applying."

==================================================
9. LIVE NOTIFICATIONS

Create:

"🔴 Live Applications"

Only display records where:

applicationStart <= today <= applicationEnd

Do NOT manually mark records as LIVE.

Calculate status automatically.

Statuses:

UPCOMING
APPLICATION OPEN
CLOSING SOON
APPLICATION CLOSED
EXAM UPCOMING
ADMIT CARD AVAILABLE
RESULT AVAILABLE
COMPLETED

==================================================
10. DEADLINE COUNTDOWN

For open applications show:

"⏰ 4 Days Left"

Calculate dynamically.

If deadline is today:

"⚠️ Closes Today"

If deadline has passed:

"Application Closed"

Never show negative days.

==================================================
11. CLOSING SOON

Create a separate:

"⏰ Closing Soon"

section.

Show applications closing within 7 days.

Sort by nearest deadline.

==================================================
12. LATEST NOTIFICATIONS

Create a notification feed.

Types:

📢 New Notification
📝 Application Open
⏰ Deadline
📅 Exam Date
🎫 Admit Card
📊 Answer Key
🏆 Result

Sort newest first.

Every notification must contain:

Date
Organization
Exam
Description
Official source
Last verified date

==================================================
13. FILTERING & SEARCH

Add global search.

Users should be able to search:

"SSC"
"Bank"
"CSE"
"12th"
"Railway"
"Police"
"Teacher"
"Engineering"
"IT Officer"

Filters:

Qualification
Age
Category
Organization
State
Sector
Stream
Application Status
Salary
Job Type

Allow multiple filters simultaneously.

==================================================
14. JOB DETAIL PAGE

Every job should have a dedicated page.

Layout:

Job title

Organization

Status

Last verified

About the job

Eligibility

Educational qualification

Age limit

Age relaxation

Vacancies

Salary

Job location

Selection process

Exam pattern

Syllabus

Application fee

Important dates

Documents required

How to apply

Official notification

Apply online

Related jobs

"Check My Eligibility"

==================================================
15. JOBS BY QUALIFICATION

Create pages/cards for:

10th Pass Jobs
12th Pass Jobs
Diploma Jobs
Graduate Jobs
B.Tech Jobs
Engineering Jobs
Post Graduate Jobs
Medical Jobs
Law Jobs
Teaching Jobs

Each should dynamically filter the database.

==================================================
16. JOBS BY CATEGORY

Create:

UPSC
SSC
Banking
Railways
Defence
Teaching
Police
Science & Technology
Engineering
IT
State Government
Central Government

==================================================
17. JOBS BY STATE

Create state filters for:

Andhra Pradesh
Telangana
Tamil Nadu
Karnataka
Kerala
Maharashtra
Delhi
Uttar Pradesh
Bihar
West Bengal
Odisha
Rajasthan
Gujarat
Madhya Pradesh
Punjab
Haryana
Other States

Do not invent current vacancies.

For state-specific opportunities, store official state recruitment authority links.

==================================================
18. ADMIN DASHBOARD

Create an Admin Dashboard if one does not already exist.

Admin can:

Add job
Edit job
Delete job
Publish job
Unpublish job
Update deadline
Update exam date
Update vacancies
Update eligibility
Update official links
Mark notification type
Set last verified date

Admin dashboard should display:

Total Jobs
Open Applications
Closing Soon
Upcoming Exams
Expired Applications
Unverified Records

Add a warning:

"Do not publish a time-sensitive notification without verifying the official source."

==================================================
19. DATA VALIDATION

Prevent:

applicationEnd < applicationStart

examDate before applicationStart unless explicitly allowed

LIVE status after applicationEnd

Missing official URL for time-sensitive records

Missing lastVerified date

Show validation errors to admin.

==================================================
20. OFFICIAL SOURCES

Prioritize official recruiting organizations.

Examples:

UPSC:
https://upsc.gov.in/

SSC:
https://ssc.gov.in/

IBPS:
https://www.ibps.in/

SBI Careers:
https://sbi.co.in/web/careers

RBI:
https://www.rbi.org.in/

RRB:
https://www.rrbapply.gov.in/

NTA:
https://www.nta.ac.in/

ISRO:
https://www.isro.gov.in/

DRDO:
https://www.drdo.gov.in/

Use the correct official recruitment/application URL for each current notification when available.

Do not link users to unofficial coaching websites as the application link.

==================================================
21. DATA QUALITY / CURRENT INFORMATION

IMPORTANT:

Do not fabricate current application deadlines.

For evergreen entries where current recruitment is not open, show:

"Recruitment varies by notification"

instead of creating a fake deadline.

For current recruitment records, only populate:

applicationStart
applicationEnd
examDate
vacancies
officialNotificationUrl
officialApplyUrl

when verified.

Add:

"Last verified: DD MMM YYYY"

to every time-sensitive record.

==================================================
22. HOME PAGE

Redesign the dashboard to show:

🔴 LIVE APPLICATIONS

⏰ CLOSING SOON

📢 LATEST NOTIFICATIONS

📅 UPCOMING EXAMS

🎯 FIND JOBS YOU'RE ELIGIBLE FOR

💻 CSE & ENGINEERING JOBS

🎓 JOBS BY QUALIFICATION

🏛️ JOBS BY CATEGORY

📍 JOBS BY STATE

Include statistics:

"120+ Opportunities"
"Live Applications"
"Upcoming Exams"
"Government Organizations"

Do not display fake statistics. Calculate them dynamically from the database.

==================================================
23. SAVED JOBS

Allow logged-in users to:

Save jobs
Remove saved jobs
View saved jobs
Set deadline reminders if notification functionality already exists

Add:

"❤️ Saved Jobs"

==================================================
24. PREPARATION SECTION

For each exam category add:

Syllabus
Exam pattern
Preparation tips
Recommended subjects
Previous paper section
Mock test placeholder

Do not present unofficial information as official.

==================================================
25. UI DESIGN

Use a modern professional government-career portal design.

Use:

Clean cards
Search bar
Filter sidebar
Status badges
Deadline countdown
Responsive tables
Icons
Readable typography
Good spacing
Mobile responsive layout

Status colors:

LIVE → green
CLOSING SOON → orange
UPCOMING → blue
CLOSED → gray
RESULT → purple

Keep the design accessible and easy for students in rural and semi-urban areas to understand.

==================================================
26. DISCLAIMER

Add this clearly in the footer and relevant pages:

"Disclaimer: This portal is created for educational and awareness purposes. Recruitment dates, eligibility, vacancies and other details may change. Candidates must verify the latest information from the official recruiting authority before applying."

==================================================
27. FINAL REQUIREMENT

After implementing everything:

Ensure there are at least 120 distinct job/exam records.

Ensure every record has a description.

Ensure every record has eligibility information.

Ensure every record has qualification information.

Ensure every record has a category.

Ensure CSE/engineering streams are properly mapped.

Ensure the eligibility finder works.

Ensure search works.

Ensure filters work.

Ensure deadline countdown works.

Ensure LIVE status is calculated automatically.

Ensure expired applications cannot appear as LIVE.

Ensure official links are displayed.

Ensure current data is separated from evergreen data.

Ensure admin can update notifications.

Ensure the website works on mobile.

Fix all TypeScript/React errors.

Test all routes.

Test the eligibility finder with:

20-year-old B.Tech CSE fresher

12th-pass student

Diploma student

Graduate student

Make sure no broken links, empty pages or placeholder text remain.

The final result should look like a real, scalable Competitive Exam & Government Jobs Awareness Portal, not a simple static college project.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://aspire-now-portal.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0f813212-0b54-4637-bf92-c5a984477391).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
