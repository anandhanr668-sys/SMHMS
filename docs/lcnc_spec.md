
✅ Prevents race conditions  
✅ Frontend & backend aligned

---

## 5️⃣ `lcnc_spec.md` — LOW-CODE / NO-CODE ENGINE

```md
# LCNC Engine Specification

## Modules
- Form Engine
- Rules Engine
- Workflow Engine
- Report Engine

---

## Form Engine
- JSON schema based
- Versioned
- Tenant scoped

---

## Rules Engine
IF:
- condition (JSONLogic)

THEN:
- action (status update, alert, assign)

---

## Workflow Engine
- State machine
- Transitions controlled by roles

---

## Report Engine
- Template + data → PDF
