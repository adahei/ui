<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  UiCard,
  UiStack,
  UiFieldset,
  UiFormField,
  UiInput,
  UiInputGroup,
  UiInputGroupText,
  UiTextarea,
  UiSelect,
  UiCheckbox,
  UiRadio,
  UiSlider,
  UiButton,
  UiFileInput,
} from '@/components'
import { User, Mail, Phone, Globe, MapPin, Building, CreditCard, Lock, Calendar, AtSign, Upload } from 'lucide-vue-next'

// Personal Information
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const dateOfBirth = ref('')
const website = ref('')
const username = ref('')

// Address
const street = ref('')
const city = ref('')
const state = ref('')
const zipCode = ref('')
const country = ref('us')

// Professional
const company = ref('')
const jobTitle = ref('')
const department = ref('')
const bio = ref('')
const yearsExperience = ref(5)
const employmentType = ref('full-time')

// Preferences
const language = ref('en')
const timezone = ref('utc')
const notifications = ref({
  email: true,
  sms: false,
  push: true,
})
const newsletter = ref(true)
const theme = ref('system')

// Payment
const cardNumber = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')
const billingAddress = ref(true)

// Account
const password = ref('')
const confirmPassword = ref('')
const twoFactor = ref(false)

// Files
const profilePhoto = ref<File[]>([])
const documents = ref<File[]>([])

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'au', label: 'Australia' },
  { value: 'jp', label: 'Japan' },
]

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
]

const timezoneOptions = [
  { value: 'utc', label: 'UTC (Coordinated Universal Time)' },
  { value: 'est', label: 'EST (Eastern Standard Time)' },
  { value: 'pst', label: 'PST (Pacific Standard Time)' },
  { value: 'cet', label: 'CET (Central European Time)' },
  { value: 'jst', label: 'JST (Japan Standard Time)' },
]

const departmentOptions = [
  { value: '', label: 'Select department...' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'finance', label: 'Finance' },
  { value: 'operations', label: 'Operations' },
]

const hasPasswordError = computed(() => {
  return confirmPassword.value && password.value !== confirmPassword.value
})

function handleSubmit() {
  alert('Form submitted! Check console for data.')
  console.log({
    personal: { firstName: firstName.value, lastName: lastName.value, email: email.value, phone: phone.value, dateOfBirth: dateOfBirth.value, website: website.value, username: username.value },
    address: { street: street.value, city: city.value, state: state.value, zipCode: zipCode.value, country: country.value },
    professional: { company: company.value, jobTitle: jobTitle.value, department: department.value, bio: bio.value, yearsExperience: yearsExperience.value, employmentType: employmentType.value },
    preferences: { language: language.value, timezone: timezone.value, notifications: notifications.value, newsletter: newsletter.value, theme: theme.value },
    account: { twoFactor: twoFactor.value },
  })
}
</script>

<template>
  <div class="page">
    <h1 class="page__title">Form Example</h1>
    <p class="page__description">
      A comprehensive form demonstrating all form components working together.
    </p>

    <form class="form-example" @submit.prevent="handleSubmit">
      <UiCard variant="filled" padding="lg">
        <UiStack gap="6">
          <!-- Personal Information -->
          <UiFieldset legend="Personal Information" variant="plain">
            <div class="form-grid form-grid--2">
              <UiFormField label="First Name" required>
                <UiInputGroup>
                  <UiInputGroupText><User :size="16" /></UiInputGroupText>
                  <UiInput v-model="firstName" placeholder="John" />
                </UiInputGroup>
              </UiFormField>
              <UiFormField label="Last Name" required>
                <UiInput v-model="lastName" placeholder="Doe" />
              </UiFormField>
            </div>

            <div class="form-grid form-grid--2">
              <UiFormField label="Email Address" required hint="We'll never share your email">
                <UiInputGroup>
                  <UiInputGroupText><Mail :size="16" /></UiInputGroupText>
                  <UiInput v-model="email" type="email" placeholder="john@example.com" />
                </UiInputGroup>
              </UiFormField>
              <UiFormField label="Phone Number">
                <UiInputGroup>
                  <UiInputGroupText><Phone :size="16" /></UiInputGroupText>
                  <UiInput v-model="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </UiInputGroup>
              </UiFormField>
            </div>

            <div class="form-grid form-grid--3">
              <UiFormField label="Username">
                <UiInputGroup>
                  <UiInputGroupText><AtSign :size="16" /></UiInputGroupText>
                  <UiInput v-model="username" placeholder="johndoe" />
                </UiInputGroup>
              </UiFormField>
              <UiFormField label="Date of Birth">
                <UiInputGroup>
                  <UiInputGroupText><Calendar :size="16" /></UiInputGroupText>
                  <UiInput v-model="dateOfBirth" placeholder="MM/DD/YYYY" />
                </UiInputGroup>
              </UiFormField>
              <UiFormField label="Website">
                <UiInputGroup>
                  <UiInputGroupText><Globe :size="16" /></UiInputGroupText>
                  <UiInput v-model="website" type="url" placeholder="https://example.com" />
                </UiInputGroup>
              </UiFormField>
            </div>

            <UiFormField label="Profile Photo" hint="Upload a photo (JPG or PNG, max 2MB)">
              <UiInputGroup>
                <UiInputGroupText><User :size="16" /></UiInputGroupText>
                <UiFileInput
                  v-model="profilePhoto"
                  accept="image/jpeg,image/png"
                  :max-size="2 * 1024 * 1024"
                />
              </UiInputGroup>
            </UiFormField>
          </UiFieldset>

          <!-- Address -->
          <UiFieldset legend="Address" variant="plain">
            <UiFormField label="Street Address">
              <UiInputGroup>
                <UiInputGroupText><MapPin :size="16" /></UiInputGroupText>
                <UiInput v-model="street" placeholder="123 Main Street, Apt 4B" />
              </UiInputGroup>
            </UiFormField>

            <div class="form-grid form-grid--4">
              <UiFormField label="City">
                <UiInput v-model="city" placeholder="New York" />
              </UiFormField>
              <UiFormField label="State / Province">
                <UiInput v-model="state" placeholder="NY" />
              </UiFormField>
              <UiFormField label="ZIP / Postal Code">
                <UiInput v-model="zipCode" placeholder="10001" />
              </UiFormField>
              <UiFormField label="Country">
                <UiSelect v-model="country" :options="countryOptions" />
              </UiFormField>
            </div>
          </UiFieldset>

          <!-- Professional Information -->
          <UiFieldset legend="Professional Information" variant="plain">
            <div class="form-grid form-grid--3">
              <UiFormField label="Company">
                <UiInputGroup>
                  <UiInputGroupText><Building :size="16" /></UiInputGroupText>
                  <UiInput v-model="company" placeholder="Acme Inc." />
                </UiInputGroup>
              </UiFormField>
              <UiFormField label="Job Title">
                <UiInput v-model="jobTitle" placeholder="Software Engineer" />
              </UiFormField>
              <UiFormField label="Department">
                <UiSelect v-model="department" :options="departmentOptions" />
              </UiFormField>
            </div>

            <UiFormField label="Years of Experience">
              <UiSlider v-model="yearsExperience" :min="0" :max="30" show-value />
            </UiFormField>

            <UiFormField label="Employment Type">
              <UiStack direction="row" gap="4" wrap="wrap">
                <UiRadio v-model="employmentType" value="full-time" label="Full-time" name="employment" />
                <UiRadio v-model="employmentType" value="part-time" label="Part-time" name="employment" />
                <UiRadio v-model="employmentType" value="contract" label="Contract" name="employment" />
                <UiRadio v-model="employmentType" value="freelance" label="Freelance" name="employment" />
              </UiStack>
            </UiFormField>

            <UiFormField label="Bio" hint="Brief description about yourself (max 500 characters)">
              <UiTextarea
                v-model="bio"
                placeholder="Tell us a bit about yourself, your experience, and what you're passionate about..."
                :rows="4"
              />
            </UiFormField>

            <UiFormField label="Resume & Documents" hint="Upload your resume, portfolio, or other documents (PDF, max 5MB each, up to 3 files)">
              <UiInputGroup>
                <UiInputGroupText><Upload :size="16" /></UiInputGroupText>
                <UiFileInput
                  v-model="documents"
                  accept=".pdf,.doc,.docx"
                  multiple
                  :max-size="5 * 1024 * 1024"
                  :max-files="3"
                />
              </UiInputGroup>
            </UiFormField>
          </UiFieldset>

          <!-- Payment Information -->
          <UiFieldset legend="Payment Information" variant="plain">
            <div class="form-grid form-grid--3">
              <UiFormField label="Card Number" class="span-2">
                <UiInputGroup>
                  <UiInputGroupText><CreditCard :size="16" /></UiInputGroupText>
                  <UiInput v-model="cardNumber" placeholder="4242 4242 4242 4242" />
                </UiInputGroup>
              </UiFormField>
              <div class="form-grid form-grid--2">
                <UiFormField label="Expiry">
                  <UiInput v-model="cardExpiry" placeholder="MM/YY" />
                </UiFormField>
                <UiFormField label="CVV">
                  <UiInput v-model="cardCvv" placeholder="123" />
                </UiFormField>
              </div>
            </div>
            <UiCheckbox v-model="billingAddress" label="Billing address is the same as shipping address" />
          </UiFieldset>

          <!-- Preferences -->
          <UiFieldset legend="Preferences" variant="plain">
            <div class="form-grid form-grid--2">
              <UiFormField label="Language">
                <UiSelect v-model="language" :options="languageOptions" />
              </UiFormField>
              <UiFormField label="Timezone">
                <UiSelect v-model="timezone" :options="timezoneOptions" />
              </UiFormField>
            </div>

            <UiFormField label="Theme">
              <UiStack direction="row" gap="4">
                <UiRadio v-model="theme" value="light" label="Light" name="theme" />
                <UiRadio v-model="theme" value="dark" label="Dark" name="theme" />
                <UiRadio v-model="theme" value="system" label="System" name="theme" />
              </UiStack>
            </UiFormField>

            <UiFormField label="Notifications">
              <UiStack direction="row" gap="4" wrap="wrap">
                <UiCheckbox v-model="notifications.email" label="Email notifications" />
                <UiCheckbox v-model="notifications.sms" label="SMS notifications" />
                <UiCheckbox v-model="notifications.push" label="Push notifications" />
              </UiStack>
            </UiFormField>

            <UiCheckbox v-model="newsletter" label="Subscribe to our newsletter for updates and promotions" />
          </UiFieldset>

          <!-- Account Security -->
          <UiFieldset legend="Account Security" variant="plain">
            <div class="form-grid form-grid--2">
              <UiFormField label="Password" required>
                <UiInputGroup>
                  <UiInputGroupText><Lock :size="16" /></UiInputGroupText>
                  <UiInput v-model="password" type="password" placeholder="Enter password" />
                </UiInputGroup>
              </UiFormField>
              <UiFormField
                label="Confirm Password"
                required
                :error="hasPasswordError ? 'Passwords do not match' : undefined"
              >
                <UiInput v-model="confirmPassword" type="password" placeholder="Confirm password" />
              </UiFormField>
            </div>

            <UiCheckbox v-model="twoFactor" label="Enable two-factor authentication for enhanced security" />
          </UiFieldset>

          <!-- Actions -->
          <UiStack direction="row" gap="3" justify="end">
            <UiButton type="button" variant="outline">Cancel</UiButton>
            <UiButton type="submit" variant="primary">Create Account</UiButton>
          </UiStack>
        </UiStack>
      </UiCard>
    </form>
  </div>
</template>

<style scoped>
.form-example {
  max-width: 900px;
}

.form-grid {
  display: grid;
  gap: var(--spacing-4);
}

.form-grid--2 {
  grid-template-columns: repeat(2, 1fr);
}

.form-grid--3 {
  grid-template-columns: repeat(3, 1fr);
}

.form-grid--4 {
  grid-template-columns: repeat(4, 1fr);
}

.span-2 {
  grid-column: span 2;
}

@media (max-width: 768px) {
  .form-grid--2,
  .form-grid--3,
  .form-grid--4 {
    grid-template-columns: 1fr;
  }

  .span-2 {
    grid-column: span 1;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .form-grid--3,
  .form-grid--4 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
