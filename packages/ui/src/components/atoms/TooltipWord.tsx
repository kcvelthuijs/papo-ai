import { DictionaryItem } from "webtypes/src/Types/Interfaces/Dictionary"

function TooltipWord({ word, translation }: DictionaryItem) {
  return (
    <span className="group relative cursor-help border-b-2 border-dotted border-blue-700">
      {word}
      <span className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white shadow group-hover:block">
        {translation}
      </span>
    </span>
  )
}

export default TooltipWord
