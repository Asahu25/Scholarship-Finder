export default function DropDown() {
    return (
        <div className="dropdown">
            <button 
                className="btn dropdown-toggle" 
                type="button" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                style={{ backgroundColor: '#6c757d', color: '#fff', border: 'none' }} 
            >
                Select Category
            </button>
            <ul className="dropdown-menu shadow w-100" aria-labelledby="dropdownMenuButton">
                <li className="dropdown-item d-flex align-items-center text-center">
                    <i className="bi bi-person-circle me-2"></i> General
                </li>
                <li className="dropdown-item d-flex align-items-center text-center">
                    <i className="bi bi-people-fill me-2"></i> OBC
                </li>
                <li className="dropdown-item d-flex align-items-center text-center">
                    <i className="bi bi-people me-2"></i> SC/ST
                </li>
            </ul>
        </div>
    );
}