import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import {NepaliCalendar} from './components/NepaliDatePicker';
import "./styles.css";

const LOCAL_STORAGE_KEY = 'selectedDates';

const App: React.FC = () => {
  const [initialValues, setInitialValues] = useState({ date1: '', date2: '' });

  const storedValues = localStorage.getItem(LOCAL_STORAGE_KEY);
  useEffect(() => {

    if (storedValues) {
      try {
        const parsed = JSON.parse(storedValues);
        setInitialValues({
          date1: parsed.date1 || '',
          date2: parsed.date2 || '',
        });
      } catch (err) {
        console.error('Error parsing localStorage data:', err);
      }
    }
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <NepaliCalendar
          name={"date1"}
            label="Select Date"
            minDate="18"
            maxDate="futureDate"
            variant="light"
            size={4}
            dynamicDate={true}
            onChange={(val: any) => {
              setFieldValue('date1', val?.target?.value?.bs || '');
              setFieldValue('date2', val?.target?.value?.ad || '');
            }}            
            formValues={
              values.date1 && values.date2
                ? { date1: values.date1, date2: values.date2 }
                : undefined
            }
          />

          <button type="submit" style={{ marginTop: '1rem' }}>Submit</button>

          <div style={{ marginTop: '1rem' }}>
            <strong>BS Date:</strong> {values.date1} <br />
            <strong>AD Date:</strong> {values.date2}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default App;
