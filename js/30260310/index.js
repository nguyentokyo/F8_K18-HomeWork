// ─── Khai báo Zod ─────────────────────────────────────────────
const { z } = window.Zod;

// TODO 1: Định nghĩa Schema
// Tách baseSchema để dùng cho validate từng field (pick)
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
        errorMap: () => ({ message: "Vui lòng chọn Role" })
    }),
    password: z
        .string()
        .min(8, "Password phải >= 8 ký tự")
        .regex(/[A-Za-z]/, "Phải có ít nhất 1 chữ cái")
        .regex(/\d/, "Phải có ít nhất 1 chữ số"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
    terms: z.literal(true, {
        errorMap: () => ({ message: "Bạn phải đồng ý điều khoản" })
    })
});

// registerSchema dùng cho lúc Submit (có kiểm tra khớp password)
const registerSchema = baseSchema.superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Mật khẩu xác nhận không khớp",
            path: ["confirmPassword"]
        });
    }
});

// TODO 2: Hàm UI Helpers
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorMsg = document.getElementById(fieldId + "Error");

    field.classList.add("is-error");
    field.classList.remove("is-success");
    if (errorMsg) {
        errorMsg.textContent = message;
        errorMsg.classList.add("show");
    }
}

function showSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    const errorMsg = document.getElementById(fieldId + "Error");

    field.classList.add("is-success");
    field.classList.remove("is-error");
    if (errorMsg) {
        errorMsg.textContent = "";
        errorMsg.classList.remove("show");
    }
}

// Hàm lấy toàn bộ dữ liệu từ Form
function getFormData() {
    return {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        role: document.getElementById("role").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value,
        terms: document.getElementById("terms").checked
    };
}

// TODO 3: Xử lý Submit
document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = getFormData();
    const result = registerSchema.safeParse(data);

    // Reset toàn bộ trạng thái trước khi check
    const allFields = Object.keys(data);
    allFields.forEach(field => showSuccess(field));

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        Object.keys(errors).forEach((field) => {
            showError(field, errors[field][0]);
        });
    } else {
        console.log("Dữ liệu hợp lệ:", result.data);
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("successScreen").classList.add("show");
    }
});

// TODO 4: Validation real-time (Blur & Change)
const fieldsToWatch = ["firstName", "lastName", "email", "phone", "role", "password", "confirmPassword", "terms"];

fieldsToWatch.forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    const eventType = input.type === "checkbox" || input.tagName === "SELECT" ? "change" : "blur";

    input.addEventListener(eventType, () => {
        const data = getFormData();

        // Luôn dùng registerSchema để đảm bảo logic confirmPassword hoạt động
        const result = registerSchema.safeParse(data);

        if (!result.success) {
            const fieldError = result.error.flatten().fieldErrors[fieldId];
            if (fieldError) {
                showError(fieldId, fieldError[0]);
            } else {
                showSuccess(fieldId);
            }
        } else {
            showSuccess(fieldId);
        }
    });
});

// TODO 5: Toggle Password Visibility
function setupToggle(toggleId, inputId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    toggle.addEventListener("click", () => {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        toggle.textContent = isPassword ? "🙈" : "👁";
    });
}
setupToggle("togglePassword", "password");
setupToggle("toggleConfirm", "confirmPassword");

// TODO 6: Password Strength Meter
document.getElementById("password").addEventListener("input", (e) => {
    const pwd = e.target.value;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (pwd === "") score = 0;

    const strengthBars = document.getElementById("strengthBars");
    const strengthLabel = document.getElementById("strengthLabel");
    const labels = ["", "Yếu", "Trung bình", "Mạnh", "Rất mạnh"];

    strengthBars.dataset.level = score;
    strengthLabel.textContent = labels[score];
});

// TODO 7: Nút Reset
document.getElementById("resetBtn").addEventListener("click", () => {
    const form = document.getElementById("registerForm");
    form.reset();

    fieldsToWatch.forEach(field => {
        const input = document.getElementById(field);
        input.classList.remove("is-error", "is-success");
        const err = document.getElementById(field + "Error");
        if(err) {
            err.textContent = "";
            err.classList.remove("show");
        }
    });

    document.getElementById("strengthBars").dataset.level = 0;
    document.getElementById("strengthLabel").textContent = "";
    document.getElementById("successScreen").classList.remove("show");
    form.style.display = "block";
});