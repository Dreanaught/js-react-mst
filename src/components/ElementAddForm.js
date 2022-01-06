import React from "react"
import { observer } from "mobx-react"
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup"

const ElementAddForm = (props) => {
    const raum = props.raum
    const bauelemente = raum.Bauelemente
    const formik = useFormik({
        initialValues: {
            bauteil: '',
            orientierung: '',
            anzahl: '1',
            firstName: '',
            lastName: '',
            email: '',
        },
        validationSchema: Yup.object({
            bauteil: Yup.number()
                .required('Required'),
            anzahl: Yup.number()
                .min(1, 'Must be greater equal 1')
                .required('Required'),
            firstName: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    });
    return (
        <Form
            noValidate
            onSubmit={formik.handleSubmit}
        >
            <Form.Group controlId="bauteil">
                <Form.Label>Bauteil</Form.Label>
                <Form.Select
                    value={formik.values.bauteil}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.bauteil && !!formik.errors.bauteil}>
                    <option>Wähle Bauteil</option>
                    {Array.from(bauelemente).map((bauelement, idx) => (
                        <option key={idx} value={bauelement.id}>{bauelement.Kurzbezeichner + ' ' + bauelement.uWert + ' W\\m²K'}</option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {formik.errors.bauteil}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="orientierung">
                <Form.Label>Orientierung</Form.Label>
                <Form.Select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.orientierung}
                    isInvalid={formik.touched.orientierung && !!formik.errors.orientierung}>
                    <option value=''></option>
                    <option value='N'>N</option>
                    <option value='S'>S</option>
                    <option value='O'>O</option>
                    <option value='W'>W</option>
                    <option value='H'>H</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {formik.errors.orientierung}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="anzahl">
                <Form.Label>Anzahl</Form.Label>
                <Form.Control
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.anzahl}
                    isInvalid={formik.touched.anzahl && !!formik.errors.anzahl}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.anzahl}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.firstName}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.lastName}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    isInvalid={formik.touched.email && !!formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">Submit</Button>
        </Form>
    );
};

export default observer(ElementAddForm)