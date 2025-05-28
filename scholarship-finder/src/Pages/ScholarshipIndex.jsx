export default function ScholarshipInd() {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
            <div style={{ flex: 1, borderRight: '1px solid #ccc', padding: '10px' }}>
                <h3>Filters</h3>
                <ul>
                    <li>Filter 1</li>
                    <li>Filter 2</li>
                    <li>Filter 3</li>
                </ul>
            </div>
            <div style={{ flex: 3, padding: '10px' }}>
                <h3>Scholarship Cards</h3>
                <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '15px', marginBottom: '10px' }}>
                    <h4>Scholarship Name</h4>
                    <p>Description of the scholarship.</p>
                </div>
            </div>
        </div>
    );
}