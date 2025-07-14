import logging
import random
from odin.adapters.parameter_tree import ParameterTree, ParameterTreeError
from tornado.ioloop import PeriodicCallback

from .base.base_controller import BaseController, BaseError


class WorkshopError(BaseError):
    """Simple exception class to wrap lower-level exceptions."""


class WorkshopController(BaseController):
    """Controller class for WORKSHOP."""

    def __init__(self, options):
        self.options = options

        self.string_val = "String Value Test"
        self.num_val = 20
        self.random_num = random.randint(0, 100)

        self.selection_list = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        self.selected = "Monday"
        self.toggle = True

        self.loop = PeriodicCallback(self.looping_update, 500)
        self.loop.start()

        self.first_name = ""
        self.last_name = ""
        self.age = 0

        self.slow_put = 5

        self.param_tree = ParameterTree({
            "string_val": (lambda: self.string_val, self.set_string),
            "num_val": (lambda: self.num_val, self.set_num_val,
                        {  # metadata
                            "min": 15,
                            "max": 76
                        }),
            "num_details": {
                "is_even": (lambda: not (self.num_val % 2), None),
                "half": (lambda: self.num_val / 2, None)
            },
            "rand_num": (lambda: self.random_num, None),
            "select_list": (lambda: self.selection_list, None),
            "selected": (lambda: self.selected, self.set_selection),
            "toggle": (lambda: self.toggle, self.set_toggle),
            "trigger": (None, self.trigger_event)
        })

    def looping_update(self):
        self.random_num = random.randint(0, 100)

    def initialize(self, adapters):
        self.adapters = adapters
        logging.debug(f"Adapters initialized: {list(adapters.keys())}")
        # Add to param tree if needed post-initialization

    def cleanup(self):
        logging.info("Cleaning up WorkshopController")

    def set_selection(self, val):
        if val in self.selection_list:
            self.selected = val
    
    def set_string(self, val):
        self.string_val = val

    def set_num_val(self, val):
        self.num_val = val

    def set_toggle(self, val):
        self.toggle = val

    def trigger_event(self, val):
        # using a warning just to make it more obvious in the terminal
        logging.warning("Event Triggered by API with value: %s", val)

    def get(self, path, with_metadata=False):
        try:
            return self.param_tree.get(path, with_metadata)
        except ParameterTreeError as error:
            logging.error(error)
            raise WorkshopError(error)

    def set(self, path, data):
        try:
            self.param_tree.set(path, data)
        except ParameterTreeError as error:
            logging.error(error)
            raise WorkshopError(error)