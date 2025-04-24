import React from "react";

const GroupList = ({ group }) => {
    return (
        <tr key={group.id}>
            <td>{group.name}</td>
            <td>{group.totalMember === null ? 0 : group.totalMember}</td>
            <td className="table-icon">
                <button className="edit-btn">I</button>
            </td>
        </tr>
    )
}

export default GroupList;