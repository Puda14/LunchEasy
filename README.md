# Lunch Easy

- **課題：** 悩まずにお昼ご飯を選べるようにする
- **解決策：** ユーザーがハノイ工科大学のキャンパス内で忙しいスケジュールの中でも昼ご飯を簡単に選べるようにサポートするアプリを提供する
- **Webアプリ名称：** ランチイージー
- **POT:** ゴースト
- **開発T:** Magi

---

## Service Port Information

| Service   | Description                    | Localhost Port | Container Port |
|-----------|--------------------------------|----------------|-----------------|
| Frontend  | ReactJS Application           | 5173           | 5173            |
| Backend   | NodeJS REST API               | 5000           | 5000            |

---

## Docker Commands

### Step 1: Build and run containers
Run the following command from the project root directory (where `docker-compose.yml` is located):
```bash
docker compose up -d --build
```

### Step 2: Check container status
```bash
docker ps
```

### Step 3: Stop containers
```bash
docker compose down
```

## Seed Data

```sh
sudo docker exec -it luncheasy-backend-1 /bin/bash
node seed
```
---

## Members

| No. | Full Name           | Role               | Email                  |
|-----|---------------------|--------------------|------------------------|
| 1   | Do Thuy Duong       | Frontend Developer | ... |
| 2   | Nguyen Truc Cuong   | Frontend Developer | ... |
| 3   | Le Quang Minh       | Backend Developer  | ... |
| 4   | Mai Viet Dung       | Backend Developer  | ... |
| 5   | Nguyen Huy Tuan     | DevOps Engineer    | ... |
| 6   | Phung Tien Dat      | DevOps Engineer    | ... |
