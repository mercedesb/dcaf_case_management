import React, { useState } from "react";
import Input from './Input'
import Select from './Select'
import mount from "../mount";
import { usei18n } from "../hooks";

const PatientDashboardForm = ({
  patient,
  weeksOptions,
  daysOptions,
  initialCallDate,
  statusTooltip
}) => {
  const i18n = usei18n();

  return (
    <>
      <div className="row">
        <div className="col-4">
          <Input
            id="patient_name"
            name="patient[name]"
            label={i18n.t('patient.shared.name')}
            value={patient.name}
            required
          />
        </div>

        <div className="col">
          <Select
            id="pateint_last_menstrual_period_weeks"
            name="patient[last_menstrual_period_weeks"
            label={i18n.t('patient.dashboard.weeks_along')}
            options={weeksOptions}
            value={weeksOptions.find(opt => opt.selected)?.value}
          />
        </div>

        <div className="col mt-4">
          <Select
            id="pateint_last_menstrual_period_days"
            name="patient[last_menstrual_period_days"
            label={i18n.t('common.days_along')}
            labelClassName="sr-only"
            options={daysOptions}
            value={daysOptions.find(opt => opt.selected)?.value}
            help={i18n.t('patient.dashboard.called_on', { date: initialCallDate })}
          />
        </div>

        <div className="col-3">
          <Input
            id="patient_appointment_date"
            name="patient[appointment_date]"
            label={i18n.t('patient.shared.appt_date')}
            type="date"
            help={
              i18n.t('patient.dashboard.approx_gestation', {
                weeks: patient.last_menstrual_period_at_appt_weeks,
                days: patient.last_menstrual_period_at_appt_days
              })
            }
          />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <Input
            id="patient_primary_phone"
            name="patient[primary_phone]"
            label={i18n.t('patient.dashboard.phone')}
            value={patient.primary_phone_display}
          />
        </div>

        <div className="col">
          <Input
            id="patient_pronouns"
            name="patient[pronouns]"
            label={i18n.t('activerecord.attributes.patient.pronouns')}
            value={patient.pronouns}
          />
        </div>

        <div className="col">
          <div className="form-group">
            <Input
              id="patient_status_display"
              label={i18n.t('patient.shared.status')}
              value={patient.status}
              className="form-control-plaintext"
              tooltip={statusTooltip}
            />
          </div>
        </div>
      </div>
    </>
  )
};

mount({
  PatientDashboardForm,
});
