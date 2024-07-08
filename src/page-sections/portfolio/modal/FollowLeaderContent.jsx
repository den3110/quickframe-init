import React from 'react';

function FollowLeaderContent({formik}) {
    const {
        errors,
        values,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      } = formik;


    return (
        <div>
            Follow Leader page
        </div>
    );
}

export default FollowLeaderContent;