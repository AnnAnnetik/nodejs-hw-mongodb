const parseBoolean = (isFavourite) => {
  if (!['true', 'false'].includes(isFavourite)) return;

  return isFavourite === 'true';
};

const parseContactType = (contactType) => {
  if (typeof contactType !== 'string') return;

  const type = contactType.toLowerCase();
  if (!['work', 'personal', 'home'].includes(type)) {
    return;
  }
  return type;
};

export const parseFilterParams = (query) => {
  return {
    isFavourite: parseBoolean(query.isFavourite),
    contactType: parseContactType(query.contactType),
  };
};
