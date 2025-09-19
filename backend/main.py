from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#using dictionary to mock databases
users = {}
profiles = {}
colleges = [
    {
        "id": 1,
        "name": "Indian Institute of Technology Bombay",
        "city": "Mumbai",
        "state": "Maharashtra",
        "courses": ["Computer Science", "Mechanical Engineering", "Electrical Engineering"],
    },
    {
        "id": 2,
        "name": "Indian Institute of Technology Delhi",
        "city": "New Delhi",
        "state": "Delhi",
        "courses": ["Computer Science", "Civil Engineering", "Chemical Engineering"],
    },
]

assessment_questions = {
    "10th": {
        "Aptitude": [
            {"id": 1, "question": "Which subject do you enjoy the most?", "type": "mcq", "options": ["Maths", "Science", "Social Studies", "Languages"]},
        ],
    },
    "12th": {
        "Aptitude": [
            {"id": 1, "question": "What stream are you currently in?", "type": "mcq", "options": ["Science", "Commerce", "Arts"]},
        ],
    },
    "ug": {
        "Aptitude": [
            {"id": 1, "question": "What is your major?", "type": "text"},
        ],
    },
}

@app.route("/")
def home():
    return "Welcome to the Career Guidance Platform Backend!"

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if email in users:
        return jsonify({"error": "User already exists"}), 400

    users[email] = {"password": password}
    return jsonify({"message": "User registered successfully"}), 201

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if email == "test@example.com" and password == "password":
        return jsonify({"message": "Login successful", "user": {"email": email}})

    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/api/profile", methods=["GET", "POST"])
def profile():
    email = "test@example.com"

    if request.method == "POST":
        data = request.get_json()
        profiles[email] = data
        return jsonify({"message": "Profile updated successfully"})

    return jsonify(profiles.get(email, {}))

@app.route("/api/assessment/questions", methods=["GET"])
def get_assessment_questions():
    user_type = request.args.get("user_type", "10th")
    return jsonify(assessment_questions.get(user_type, {}))

@app.route("/api/assessment/submit", methods=["POST"])
def submit_assessment():
    mock_result = {
        "interim_reports": [
            {"title": "Aptitude Report", "score": 80},
        ],
        "final_report": {
            "personality_traits": ["Analytical", "Creative", "Detail-oriented"],
            "academic_streams": ["Science", "Commerce"],
            "career_recommendations": ["Software Engineer", "Data Analyst", "Chartered Accountant"],
            "course_recommendations": ["B.Tech in Computer Science", "B.Com in Accounting"],
            "college_recommendations": [colleges[0]],
            "explanation": "Based on your answers, you have a strong analytical and creative aptitude. The recommended streams and careers are based on this assessment."
        }
    }
    return jsonify(mock_result)

@app.route("/api/colleges", methods=["GET"])
def get_colleges():
    search_term = request.args.get("search", "").lower()
    if search_term:
        filtered_colleges = [
            c for c in colleges
            if search_term in c["name"].lower() or search_term in c["city"].lower()
        ]
        return jsonify(filtered_colleges)
    return jsonify(colleges)

@app.route("/api/colleges/<int:college_id>", methods=["GET"])
def get_college(college_id):
    college = next((c for c in colleges if c["id"] == college_id), None)
    if college:
        return jsonify(college)
    return jsonify({"error": "College not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)