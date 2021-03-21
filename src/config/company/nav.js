import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon
} from 'react-feather'

const companyNavConf = {
  role: 'Empresa',
  items: [
    {
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: 'Inicio',
    },
    {
      href: '/app/account',
      icon: UserIcon,
      title: 'Perfil',
    },
    {
      href: '/app/account',
      icon: UserIcon,
      title: 'Ofertas Publicadas',
    },
    {
      href: '/register',
      icon: UserPlusIcon,
      title: 'Crear Oferta ',
    },
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Configuracion',
    },
  ],
}

export default companyNavConf