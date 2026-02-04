# HMS Realtime (Socket.IO)

## Connection
- Auth via JWT
- Tenant resolved on connect

---

## Events

### bed:update
Payload:
```json
{
  "bedId": "uuid",
  "status": "OCCUPIED"
}
