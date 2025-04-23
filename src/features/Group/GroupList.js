import React from "react";

const GroupList = ({group}) => {
    return(
        <tr>
            <td>{group.name}</td>
            <td>{group.totalMember}</td>
        </tr>
    )
}

export default GroupList;