import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PasswordRecovery = () => {
    const initialValues = { email: '' };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
    });

    const handleSubmit = (values) => {
        console.log('Recovery Email:', values);
        // Handle password recovery logic here (e.g., API call)
    };

    return (
        <div>
            <h2>Password Recovery</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <Field type="email" id="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <button type="submit">Recover Password</button>
                </Form>
            </Formik>
        </div>
    );
};

export default PasswordRecovery;
