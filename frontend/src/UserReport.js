import React from 'react';


const UserReport = ({ user, activityHistory }) => {

    if (!user) return null;

    const totalBorrowed = activityHistory.length;
    const returned = activityHistory.filter(h => h.status === 'Returned').length;
    const pending = totalBorrowed - returned;

    return (
        <div style={styles.reportContainer}>

            <div style={styles.header}>
                <div style={styles.titleSection}>
                    <h1 style={styles.mainTitle}>User Activity Report</h1>
                    <p style={styles.dateGenerated}>Generated on: {new Date().toLocaleDateString()}</p>
                </div>

                <div style={styles.profileCard}>
                    <div style={styles.profileRow}>
                        <strong>User ID:</strong> <span>{user.id}</span>
                    </div>
                    <div style={styles.profileRow}>
                        <strong>Name:</strong> <span>{user.name}</span>
                    </div>
                    <div style={styles.profileRow}>
                        <strong>Role:</strong> <span style={styles.tag}>{user.role}</span>
                    </div>
                    <div style={styles.profileRow}>
                        <strong>Email:</strong> <span>{user.email}</span>
                    </div>
                    <div style={styles.profileRow}>
                        <strong>Joined Date:</strong> <span>{user.joinedDate}</span>
                    </div>
                </div>
            </div>

            <hr style={styles.divider} />

            <div style={styles.statsContainer}>
                <div style={styles.statBox}>
                    <h3>Total Books</h3>
                    <p style={styles.statNumber}>{totalBorrowed}</p>
                </div>
                <div style={styles.statBox}>
                    <h3>Returned</h3>
                    <p style={styles.statNumber}>{returned}</p>
                </div>
                <div style={{...styles.statBox, color: '#d9534f'}}>
                    <h3>Pending / Due</h3>
                    <p style={styles.statNumber}>{pending}</p>
                </div>
            </div>

            <div style={styles.tableSection}>
                <h3 style={{ marginBottom: '10px' }}>Transaction History</h3>
                <table style={styles.table}>
                    <thead>
                    <tr style={styles.tableHeader}>
                        <th style={styles.th}>Book Title</th>
                        <th style={styles.th}>Issue Date</th>
                        <th style={styles.th}>Due Date</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Fine ($)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activityHistory.map((record, index) => (
                        <tr key={index} style={index % 2 === 0 ? styles.trEven : styles.trOdd}>
                            <td style={styles.td}>{record.bookName}</td>
                            <td style={styles.td}>{record.issueDate}</td>
                            <td style={styles.td}>{record.dueDate}</td>
                            <td style={styles.td}>
                  <span style={record.status === 'Returned' ? styles.statusOk : styles.statusAlert}>
                    {record.status}
                  </span>
                            </td>
                            <td style={styles.td}>{record.fine > 0 ? `$${record.fine}` : '-'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div style={styles.footer}>
                <p>End of Report for {user.name}</p>
            </div>
        </div>
    );
};

const styles = {
    reportContainer: {
        background: 'white',
        padding: '40px',
        maxWidth: '900px',
        margin: '20px auto',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        color: '#333'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px'
    },
    mainTitle: {
        margin: 0,
        color: '#2c3e50',
        fontSize: '28px'
    },
    dateGenerated: {
        color: '#7f8c8d',
        fontSize: '14px',
        marginTop: '5px'
    },
    profileCard: {
        background: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        width: '300px',
        border: '1px solid #e9ecef'
    },
    profileRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
        fontSize: '14px'
    },
    tag: {
        background: '#3498db',
        color: 'white',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '12px'
    },
    divider: {
        border: '0',
        borderTop: '2px solid #eee',
        margin: '20px 0'
    },
    statsContainer: {
        display: 'flex',
        gap: '20px',
        marginBottom: '30px'
    },
    statBox: {
        flex: 1,
        background: '#fff',
        border: '1px solid #ddd',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
    },
    statNumber: {
        fontSize: '32px',
        fontWeight: 'bold',
        margin: '10px 0 0 0'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px'
    },
    tableHeader: {
        background: '#2c3e50',
        color: 'white',
        textAlign: 'left'
    },
    th: {
        padding: '12px'
    },
    td: {
        padding: '12px',
        borderBottom: '1px solid #ddd'
    },
    trEven: { background: '#fff' },
    trOdd: { background: '#f9f9f9' },
    statusOk: {
        color: '#27ae60',
        fontWeight: 'bold'
    },
    statusAlert: {
        color: '#c0392b',
        fontWeight: 'bold'
    },
    footer: {
        marginTop: '40px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#aaa',
        borderTop: '1px solid #eee',
        paddingTop: '20px'
    }
};

export default UserReport;