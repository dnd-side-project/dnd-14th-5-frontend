interface FormatCharacterNameProps {
  name: string;
}

export const formatCharacterName = ({ name }: FormatCharacterNameProps) =>
  name.replace('캐릭터', '').replace(' ', '');
