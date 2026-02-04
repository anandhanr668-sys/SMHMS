
✅ Prevents frontend/backend mismatch  
✅ Versioned  
✅ Stable forever

---

## 2️⃣ `data_model.md` — DATABASE BLUEPRINT

```md
# HMS Data Model

## Core Principles
- Multi-tenant isolation
- UUID primary keys
- Soft deletes
- Audit fields everywhere

---

## Tenant (Hospital)
- id (uuid)
- name
- domain
- created_at

---

## Users
- id
- tenant_id
- email
- password_hash
- role_id
- is_active

---

## Roles
- id
- name (ADMIN, DOCTOR, NURSE, etc)

---

## Permissions
- id
- resource
- action

---

## Patients
- id
- tenant_id
- name
- dob
- gender
- contact_info

---

## Visits
- id
- patient_id
- doctor_id
- visit_date
- status

---

## Reports
- id
- visit_id
- template_id
- data_json
