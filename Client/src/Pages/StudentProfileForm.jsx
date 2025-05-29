import DropDown from "../components/dropDown";
import "../Styles/StudentProfileForm.css";

export default function StudentProfileForm() {
    return (
        <>
        <form className="student-profile-form">
            <label>
                Course of Study
                <input className="course-of-study" placeholder="Course of Study" required />
            </label>
            <label>
                Grades
                <input className="grades" placeholder="Grades" required />
            </label>
            <label>
                Location
                <input className="location" placeholder="Location" required />
            </label>
            <div className="row-container">
                <label>
                    Annual Income
                    <input className="annual-income" placeholder="Annual Income" />
                </label>
                <label className="category-container">
                    <span className="category-label">Category</span>
                    <DropDown />
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
        </>
    );
}