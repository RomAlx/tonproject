import json
from ..logs.logger import Logger


class ShitController:
    def __init__(self):
        self.logger = self.logger = Logger(name="shiiit").get_logger()

    def print_shit(self, data):
        self.logger.info(f'Your shit: {json.dumps(data, indent=4, ensure_ascii=False, sort_keys=True)}')
