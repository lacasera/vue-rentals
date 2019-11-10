<template>
    <li class="flex items-center">
        <div class=" rounded-full p-2 fill-current text-green-700">
            <svg class="w-6 h-6 align-middle"
                 width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke="currentColor"
                 stroke-width="2"
                 stroke-linecap="round"
                 stroke-linejoin="round"
            >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        </div>
        <span id="slot-text" class="text-gray-700 text-lg ml-3">
           {{ item }}
        </span>
    </li>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    item: {
      type: String
    }
  }
}
</script>
