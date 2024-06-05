import React, { useState } from "react";
import Input from './Input'
import Select from './Select'
import mount from "../mount";
import { usei18n, useFetch } from "../hooks";

const PatientDashboardForm = ({
  patient,
  weeksOptions,
  daysOptions,
  initialCallDate,
  statusTooltip,
  isAdmin,
  patientPath,
  formAuthenticityToken
}) => {
  const i18n = usei18n();
  const { put } = useFetch();

  const [patientData, setPatientData] = useState(patient)

  const autosave = async (updatedData) => {
    const updatedPatientData = { ...patientData, ...updatedData }
    setPatientData(updatedPatientData)

    const data = await put(patientPath, { ...updatedPatientData, authenticity_token: formAuthenticityToken })
    if (data.errors) {
      // TODO: handle error
    } else {
      setPatientData(data)
    }
  }

  return (
    <form
      id="patient_dashboard_form"
      action={patientPath}
      data-remote="true" method="post"
      className="grid grid-columns-3 grid-rows-2"
    >
      <Input
        id="patient_name"
        name="patient[name]"
        label={i18n.t('patient.shared.name')}
        value={patientData.name}
        required
        onChange={e => autosave({ name: e.target.value })}
      />

      <div className="grid grid-columns-2">
        <Select
          id="pateint_last_menstrual_period_weeks"
          name="patient[last_menstrual_period_weeks"
          label={i18n.t('patient.dashboard.weeks_along')}
          options={weeksOptions}
          value={weeksOptions.find(opt => opt.value === patientData.last_menstrual_period_weeks)?.value}
          onChange={e => autosave({ last_menstrual_period_weeks: e.target.value })}
        />

        <Select
          id="pateint_last_menstrual_period_days"
          name="patient[last_menstrual_period_days"
          label={i18n.t('common.days_along')}
          labelClassName="sr-only"
          options={daysOptions}
          value={weeksOptions.find(opt => opt.value === patientData.last_menstrual_period_days)?.value}
          help={i18n.t('patient.dashboard.called_on', { date: initialCallDate })}
          onChange={e => autosave({ last_menstrual_period_days: e.target.value })}
        />
      </div>

      <Input
        id="patient_appointment_date"
        name="patient[appointment_date]"
        label={i18n.t('patient.shared.appt_date')}
        type="date"
        help={
          i18n.t('patient.dashboard.approx_gestation', {
            weeks: patientData.last_menstrual_period_at_appt_weeks,
            days: patientData.last_menstrual_period_at_appt_days
          })
        }
        value={patientData.appointment_date}
        onChange={e => autosave({ appointment_date: e.appointment_date })}
      />

      <Input
        id="patient_primary_phone"
        name="patient[primary_phone]"
        label={i18n.t('patient.dashboard.phone')}
        value={patientData.primary_phone_display}
        onChange={e => autosave({ primary_phone_display: e.target.value })}
      />

      <div className="grid grid-columns-2">
        <Input
          id="patient_pronouns"
          name="patient[pronouns]"
          label={i18n.t('activerecord.attributes.patient.pronouns')}
          value={patientData.pronouns}
          onChange={e => autosave({ pronouns: e.target.value })}
        />

        <Input
          id="patient_status_display"
          label={i18n.t('patient.shared.status')}
          value={patientData.status}
          className="form-control-plaintext"
          tooltip={statusTooltip}
          onChange={e => autosave({ status: e.target.value })}
        />
      </div>


      <div>
        {isAdmin && (
          <>
            <label>{i18n.t('patient.dashboard.delete_label')}</label>
            <div>
              <a className="btn btn-danger" data-confirm={i18n.t('patient.dashboard.confirm_del', { name: patient.name })} rel="nofollow" data-method="delete" href={patientPath}>{i18n.t('patient.dashboard.delete')}</a>
            </div>
          </>
        )}
      </div>
    </form>
  )
};

mount({
  PatientDashboardForm,
});
