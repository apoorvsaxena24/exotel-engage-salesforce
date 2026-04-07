import { MessageSquare, Mail, Phone, Mic, Bot, Headphones, MessagesSquare } from 'lucide-react';
import type { ChannelType } from '../../types';
import { channelLabel, channelColor } from '../../utils';

const channelIcons: Record<ChannelType, React.ElementType> = {
  sms: MessageSquare, whatsapp: MessagesSquare, email: Mail,
  call: Phone, ivr: Mic, voicebot: Bot, contact_center: Headphones,
};

export function ChannelPill({ channel, size = 'sm' }: { channel: ChannelType; size?: 'sm' | 'md' }) {
  const Icon = channelIcons[channel];
  const color = channelColor(channel);
  const h = size === 'sm' ? 'h-6 text-[11px] px-2 gap-1' : 'h-7 text-xs px-2.5 gap-1.5';
  const iconSize = size === 'sm' ? 12 : 14;

  return (
    <span className={`inline-flex items-center ${h} rounded-full font-medium`} style={{ backgroundColor: `${color}18`, color }}>
      <Icon size={iconSize} />
      {channelLabel(channel)}
    </span>
  );
}
