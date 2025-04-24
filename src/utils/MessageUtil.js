import React, { useEffect, useState } from "react";

const Message = ({ mess }) => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (mess) {
            setShow(true);
            const timeout = setTimeout(() => {
                setShow(false)
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [mess])

    return (
        <>
            {show && <p className="show-mess">{mess}</p>}
        </>
    )
}

export default Message;