# Role-Based Access Control (RBAC)

## Roles
- ADMIN
- DOCTOR
- NURSE
- FRONTDESK
- PATIENT

---

## Permission Model
permission = action + resource

Examples:
- read:patient
- create:visit
- generate:report

---

## Role Mapping

ADMIN:
- Full access

DOCTOR:
- read/write patients
- create visits
- generate reports

NURSE:
- read patients
- update vitals

FRONTDESK:
- register patients
- manage appointments

PATIENT:
- read own records only

---

## Enforcement
- Middleware → Guard → Policy
- No role checks inside controllers
