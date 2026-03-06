function login(username, password) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (username === "admin" && password === "123456") {
                resolve({
                    id: 1,
                    username: "admin",
                    role: "ADMIN"
                });
            } else {
                reject("Sai tài khoản hoặc mật khẩu");
            }

        }, 2000);

    });
}

console.log("Đang gửi request đăng nhập...");

login("admin", "123456")
    .then(user => {
        console.log("Đăng nhập thành công");
        console.log("User:", user);
    })
    .catch(err => {
        console.log("Lỗi:", err);
    });