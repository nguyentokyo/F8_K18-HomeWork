
// ─── Khai báo Zod ─────────────────────────────────────────────
const { z } = window.Zod;

// TODO 1: Định nghĩa registerSchema
// const registerSchema = z.object({ ... });
const baseSchema = z.object({
    firstName: z.string().trim().min(2, "First name phải >= 2 ký tự"),

    lastName: z.string().trim().min(2, "Last name phải >= 2 ký tự"),

    email: z.string().trim().email("Email không đúng định dạng"),

    phone: z
        .string()
        .trim()
        .optional()
        .refine(
            (val) => !val || /^0\d{9}$/.test(val),
            "Phone phải có dạng 0XXXXXXXXX"
        ),

    role: z.enum(["dev", "design", "pm", "other"], {
        errorMap: () => ({ message: "Role không hợp lệ" })
    }),

    password: z
        .string()
        .min(8, "Password phải >= 8 ký tự")
        .regex(/[A-Za-z]/, "Password phải có ít nhất 1 chữ cái")
        .regex(/\d/, "Password phải có ít nhất 1 chữ số"),

    confirmPassword: z.string(),

    terms: z.literal(true, {
        errorMap: () => ({ message: "Bạn phải đồng ý điều khoản" })
    })
});

const registerSchema = baseSchema.superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Password và Confirm Password không khớp",
            path: ["confirmPassword"]
        });
    }
});

// TODO 2: Hàm showError / showSuccess / clearField
// function showError(fieldId, errorMsgId, message) { ... }
function showError(fieldId, errorMsgId, message) {
    const field = document.getElementById(fieldId);
    const errorMsg = document.getElementById(errorMsgId);

    // thêm class lỗi
    field.classList.add("is-error");
    field.classList.remove("is-success");

    // hiển thị message
    errorMsg.textContent = message;
    errorMsg.classList.add("show");
}
// function showSuccess(fieldId, errorMsgId) { ... }
function showSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    const errorMsg = field.nextElementSibling;

    // thêm class success
    field.classList.add("is-success");
    field.classList.remove("is-error");

    // ẩn lỗi
    if (errorMsg) {
        errorMsg.textContent = "";
        errorMsg.classList.remove("show");
    }
}

// TODO 3: Xử lý submit
// document.getElementById('registerForm').addEventListener('submit', (e) => { ... });
document
    .getElementById("registerForm")
    .addEventListener("submit", (e) => {

        e.preventDefault();

        const data = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            role: document.getElementById("role").value,
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirmPassword").value,
            terms: document.getElementById("terms").checked
        };

        const result = registerSchema.safeParse(data);

        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;

            Object.keys(errors).forEach((field) => {
                showError(field, field + "Error", errors[field][0]);
            });
        } else {
            document.getElementById("registerForm").style.display = "none";
            document.getElementById("successScreen").classList.add("show");
        }
    });

// TODO 4: Validation real-time khi blur
// document.getElementById('email').addEventListener('blur', () => { ... });
const fields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "role",
    "password",
    "confirmPassword"
];

fields.forEach((field) => {
    const input = document.getElementById(field);

    input.addEventListener("blur", () => {
        const value =
            input.type === "checkbox"
                ? input.checked
                : input.value;

        const fieldSchema = baseSchema.pick({ [field]: true });
        const result = fieldSchema.safeParse({ [field]: value });

        if (!result.success) {
            const error = result.error.flatten().fieldErrors[field][0];
            showError(field, field + "Error", error);
        } else {
            showSuccess(field);
        }
    });
});

// TODO 5: Toggle password
// document.getElementById('togglePassword').addEventListener('click', () => { ... });
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "👁";
    }

});

const toggleConfirm = document.getElementById("toggleConfirm");
const confirmInput = document.getElementById("confirmPassword");

toggleConfirm.addEventListener("click", () => {

    if (confirmInput.type === "password") {
        confirmInput.type = "text";
        toggleConfirm.textContent = "🙈";
    } else {
        confirmInput.type = "password";
        toggleConfirm.textContent = "👁";
    }

});

// TODO 6: Thanh độ mạnh mật khẩu
// document.getElementById('password').addEventListener('input', () => { ... });
const strengthBars = document.getElementById("strengthBars");
const strengthLabel = document.getElementById("strengthLabel");

passwordInput.addEventListener("input", () => {

    const password = passwordInput.value;
    let score = 0;

    // ≥ 8 ký tự
    if (password.length >= 8) score++;

    // có chữ hoa
    if (/[A-Z]/.test(password)) score++;

    // có số
    if (/[0-9]/.test(password)) score++;

    // có ký tự đặc biệt
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // cập nhật level
    strengthBars.dataset.level = score;

    // cập nhật label
    const labels = ["", "Weak", "Medium", "Strong", "Very Strong"];
    strengthLabel.textContent = labels[score];

});

// TODO 7: Nút Reset
// document.getElementById('resetBtn').addEventListener('click', () => { ... });
document
    .getElementById("resetBtn")
    .addEventListener("click", () => {

        const form = document.getElementById("registerForm");
        const successScreen = document.getElementById("successScreen");

        // reset dữ liệu form
        form.reset();

        // xoá class error / success
        document.querySelectorAll(".input-field").forEach((input) => {
            input.classList.remove("is-error", "is-success");
        });

        // xoá message lỗi
        document.querySelectorAll(".error-msg").forEach((err) => {
            err.textContent = "";
            err.classList.remove("show");
        });

        // ẩn success screen
        successScreen.classList.remove("show");

        // hiện lại form
        form.style.display = "block";
    });