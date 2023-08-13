import { useRegisterUser } from 'api/auth'
import Button from 'components/Button'
import Overlay from 'components/Modals/Overlay'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import * as yup from 'yup'
import SadIllustration from '../../assets/icons/sad.svg'
import VerifyIllustration from '../../assets/icons/verified.svg'
import styles from './style.module.scss'

interface Props {
    modalOpened: boolean,
    closeModal: () => void
}

interface RegisterFormType {
    firstName: string;
    lastName: string;
    email: string;
}

type TabsType = 'form' | 'success' | 'failed'

const validationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
});

const AddUserModal = ({ modalOpened, closeModal }: Props) => {
    const [activeTab, setActiveTab] = useState<TabsType>('form')
    const mutation = useRegisterUser()

    const handleSubmit = (values: RegisterFormType, helpers: FormikHelpers<RegisterFormType>) => {

        mutation.mutate({
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email
        }, {
            onSuccess() {
                setActiveTab('success')
            },
            onError() {
                setActiveTab('failed')
            }
        })
        helpers.resetForm()
    }

    return (
        <Overlay opened={modalOpened}>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: ''
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}>
                {(formik) => (
                    <div className='modal'>
                        <RxCross2
                            onClick={() => {
                                closeModal()
                                setActiveTab('form')
                            }}
                            className={styles.close_icon} />

                        {activeTab === 'form' &&
                            <Form className='form-default'>
                                <div className='form-group'>
                                    <label htmlFor='firstName'>First Name</label>
                                    <ErrorMessage name='firstName' component='div' className='error-message' />
                                    <Field type='text' name='firstName' id='firstName' placeholder='Cypher' />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='lastName'>Last Name</label>
                                    <ErrorMessage name='lastName' component='div' className='error-message' />
                                    <Field type='text' name='lastName' id='lastName' placeholder='Moon' />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <ErrorMessage name='email' component='div' className='error-message' />
                                    <Field type='email' name='email' id='email' placeholder='example@mail.com' />
                                </div>

                                <Button
                                    type='submit'
                                    text={mutation.isLoading ? 'submitting...' : 'Submit'}
                                    fullWidth
                                    center />
                            </Form>
                        }

                        {activeTab === 'success' && (
                            <div className={`${styles.register_state} ${styles.fadeIn}`}>
                                <h3>Registration Successful</h3>
                                <img src={VerifyIllustration} alt="Verify illustration" />
                                <p>A mail has to been sent to {formik.values.email} containing the otp link</p>
                                <Button
                                    text='Register Again'
                                    onClick={() => setActiveTab('form')} />
                            </div>
                        )}

                        {activeTab === 'failed' && (
                            <div className={`${styles.register_state} ${styles.fadeIn}`}>
                                <h3>Registration Failed</h3>
                                <img src={SadIllustration} alt="Sad illustration" />
                                <p>Registration failed, Please Try again, {mutation?.error?.message}</p>
                                <Button
                                    text='Try again'
                                    onClick={() => setActiveTab('form')}
                                />
                            </div>
                        )}

                    </div>
                )}
            </Formik>


        </Overlay >
    )
}

export default AddUserModal