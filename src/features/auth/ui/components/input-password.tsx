import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import { HugeiconsIcon } from '@hugeicons/react'
import { LockPasswordIcon } from '@hugeicons/core-free-icons'

import { useState } from 'react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'

type Props = Omit<React.ComponentProps<typeof InputGroupInput>, 'type'>

export const InputPassword = (props: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <InputGroup>
      <InputGroupInput {...props} type={showPassword ? 'text' : 'password'} />
      <InputGroupAddon>
        <HugeiconsIcon icon={LockPasswordIcon} />
      </InputGroupAddon>

      <InputGroupAddon align="inline-end">
        <InputGroupButton
          onClick={togglePassword}
          size="icon-xs"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          aria-pressed={showPassword}
        >
          {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
