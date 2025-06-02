import React, {useState} from "react";
import '../Styles/Profile.css'

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        institution: '',
        grade: '',
        category: '',
        income: '',
        stream: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));
    };    

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Send formData to server or context
        console.log('Profile data submitted:', formData);
    };

    return (
        <div className="profile-container">
            <h2 className="profile-title">My Profile</h2>
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                    <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Email">Email <span className="required">*</span></label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="institution">Current Instituion <span className="required">*</span></label>
                    <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="Enter your institution name"
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="grade">Grades <span className="required">*</span></label>
                    <input
                    type="text"
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    placeholder="On scale of 10"
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">
                      Category<span className="required">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled hidden>
                        Select category
                      </option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="Other">Other</option>
                    </select>
                </div>


                <div className="form-group">
                    <label htmlFor="income">Family Income (INR)</label>
                    <input
                        type="number"
                        id="income"
                        name="income"
                        value={formData.income}
                        onChange={handleChange}
                        placeholder="Annual family income"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="stream">Stream of Study</label>
                    <input
                      type="text"
                      id="stream"
                      name="stream"
                      value={formData.stream}
                      onChange={handleChange}
                      placeholder="e.g., Science, Commerce, Arts"
                    />
                </div>

                <button type="submit" className="save-button">
                    Save Profile
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;