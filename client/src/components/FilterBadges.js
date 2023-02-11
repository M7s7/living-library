const FilterBadges = ({favouriteView, readingView, hideCompleted, hideExplicit }) => {
  if (!favouriteView && !readingView && hideCompleted && hideExplicit ) {
    return (
    "None"
    )
  }

  const favouriteBadge = <span
  className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded border border-purple-500">
    Favourites
  </span>
  const readingBadge = <span
  className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded border border-yellow-500">
    Reading list
  </span>
  const completedBadge = <span
  className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded border border-green-500">
    Hide read works
  </span>
  const explicitBadge = <span
    className="bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded border border-pink-500">
      Hide explicit
    </span>
  return (
    <div className="flex gap-2">
    {favouriteView ? favouriteBadge: <></> }
    {readingView ? readingBadge : <></>}
    {hideCompleted ? completedBadge : <></>}
    {hideExplicit ? explicitBadge : <></>}
    </div>
  )
}

export default FilterBadges;