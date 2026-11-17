const formatPKR = new Intl.NumberFormat('ur-PK', {
  style: 'currency',
  currency: 'PKR',
  minimumFractionDigits: 0,
}).format

function EntityPill({ entity, selected, handleClick, showMeta }) {
  return (
    <>
      <input
        type="radio"
        name="app"
        id={`entity-${entity.id}`}
        value={entity.id}
        className="peer hidden"
        checked={Number(selected) === Number(entity.id)}
        onChange={() => handleClick(entity.id)}
      />
      <label
        htmlFor={`entity-${entity.id}`}
        className="inline-flex w-full h-full justify-between items-center bg-white hover:bg-primary/20 peer-checked:!bg-secondary peer-checked:!text-primary rounded-2xl p-4 text-dark border border-secondary/20 cursor-pointer transition-all shadow-sm"
      >
        <div className="block w-full">
          <img
            src={entity.logo}
            width={50}
            height={50}
            alt={entity.name}
            className="w-[30px] h-[30px] md:w-[44px] md:h-[44px] object-contain"
          />
          <div className="w-full mt-2 text-xs font-bold md:text-sm">{entity.name}</div>
          {showMeta && (
            <div className="mt-1 text-[11px] opacity-80 flex flex-wrap gap-x-2">
              {entity.fees !== undefined && <span>{formatPKR(entity.fees)}</span>}
              {entity.max_team_size !== undefined && (
                <span>• Max {entity.max_team_size}</span>
              )}
            </div>
          )}
        </div>
      </label>
    </>
  )
}

export default function EntitySelector({ list, selected, handleClick, showMeta = false }) {
  return (
    <>
      <ul className="flex md:flex-row flex-wrap justify-center gap-3 md:gap-4 my-4 px-4 z-[100]">
        {list?.map((entity) => (
          <li
            key={entity.id}
            className="rounded-2xl select-none w-[calc(50%-0.5rem)] sm:w-[180px] md:w-[220px]"
          >
            <EntityPill
              entity={entity}
              selected={selected}
              handleClick={handleClick}
              showMeta={showMeta}
            />
          </li>
        ))}
      </ul>
      <hr className="border-secondary/15 my-4" />
    </>
  )
}
