const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const studentId = document.getElementById("studentId");
const studentCourse = document.getElementById("studentCourse");
const studentLevel = document.getElementById("studentLevel");
const studentGrade = document.getElementById("studentGrade");
const studentTableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");
const submitButton = document.getElementById("submitButton");
const editIndex = document.getElementById("editIndex");

let students = JSON.parse(localStorage.getItem("students")) || [];

function displayStudents(searchTerm = "") {
    studentTableBody.innerHTML = "";

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    emptyMessage.style.display =
        filteredStudents.length === 0 ? "block" : "none";

    filteredStudents.forEach((student, index) => {
        const originalIndex = students.indexOf(student);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.course}</td>
            <td>${student.level}</td>
            <td>${student.grade}</td>
            <td>
                <button class="edit-btn"
                    onclick="editStudent(${originalIndex})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteStudent(${originalIndex})">
                    Delete
                </button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });

    updateDashboard();
}

studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const student = {
        name: studentName.value.trim(),
        id: studentId.value.trim(),
        course: studentCourse.value.trim(),
        level: studentLevel.value,
        grade: studentGrade.value
    };

    if (editIndex.value === "") {
        students.push(student);
        alert("Student added successfully!");
    } else {
        students[Number(editIndex.value)] = student;
        alert("Student updated successfully!");
    }

    localStorage.setItem("students", JSON.stringify(students));

    studentForm.reset();
    editIndex.value = "";
    submitButton.textContent = "Add Student";

    displayStudents();
});

function editStudent(index) {
    const student = students[index];

    studentName.value = student.name;
    studentId.value = student.id;
    studentCourse.value = student.course;
    studentLevel.value = student.level;
    studentGrade.value = student.grade;

    editIndex.value = index;
    submitButton.textContent = "Update Student";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function deleteStudent(index) {
    const confirmation = confirm(
        "Are you sure you want to delete this student?"
    );

    if (confirmation) {
        students.splice(index, 1);

        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();

        alert("Student deleted successfully!");
    }
}

searchInput.addEventListener("input", function() {
    displayStudents(searchInput.value);
});

function updateDashboard() {
    const totalStudents =
        document.getElementById("totalStudents");

    const totalCourses =
        document.getElementById("totalCourses");

    const passedStudents =
        document.getElementById("passedStudents");

    const failedStudents =
        document.getElementById("failedStudents");

    totalStudents.textContent = students.length;

    const courses = new Set(
        students.map(student =>
            student.course.toLowerCase()
        )
    );

    totalCourses.textContent = courses.size;

    const passed = students.filter(student =>
        ["A", "B", "C", "D", "E"].includes(student.grade)
    ).length;

    passedStudents.textContent = passed;

    const failed = students.filter(student =>
        student.grade === "F"
    ).length;

    failedStudents.textContent = failed;
}

displayStudents();
